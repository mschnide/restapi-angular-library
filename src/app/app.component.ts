import { Component, OnInit } from '@angular/core';
import {
  PxConnectionSettingsService,
  PxHttpService,
  PxInfo,
  PxInfoService,
  PxLogin,
  PxLoginService
} from 'projects/lib/src/public-api';
import { AppConfiguration } from './app.configuration';
import { Mitarbeiter } from './models/mitarbeiter';
import { Stundeninfo } from './models/stundeninfo';

@Component({
  selector: 'app-root',
  template: '<h1>PROFFIX REST API Library für Angular</h1><pre>{{output}}</pre>'
})
export class AppComponent implements OnInit {
  output = "";

  private login: PxLogin;

  constructor(
    private appConfiguration: AppConfiguration,
    private connectionSettingsService: PxConnectionSettingsService,
    private infoService: PxInfoService,
    private loginService: PxLoginService,
    private httpService: PxHttpService
  ) {
    this.connectionSettingsService.save({
      WebserviceUrl: "https://remote.proffix.net:11011/pxapi/v4",
      WebservicePasswortHash: "16378f3e3bc8051435694595cbd222219d1ca7f9bddf649b9a0c819a77bb5e50"
    });
    this.login = {
      Benutzer: "Gast",
      Passwort: "16ec7cb001be0525f9af1a96fd5ea26466b2e75ef3e96e881bcb7149cd7598da",
      Datenbank: { Name: "DEMODB", Bezeichnung: "" },
      Module: this.appConfiguration.requiredLicencedModules
    };
  }

  ngOnInit(): void {
    this.checkConnection();
  }

  private checkConnection(): void {
    this.printLog("Prüfe Verbindung...");
    this.infoService.getInfo().subscribe({
      next: (info: PxInfo) => {
        this.printLog(`Verbindung besteht, REST API Version: ${info.Version}`);
        this.doLogin();
      },
      error: (error: Error) => this.printError(`Verbindung konnte nicht hergestellt werden: ${JSON.stringify(error)}`)
    });
  }

  private doLogin(): void {
    this.printLog("Versuche Login...");
    this.loginService.doLogin(this.login).subscribe({
      next: (login: PxLogin) => {
        this.login = login;
        const mitarbeiter = this.login.Mitarbeiter as Mitarbeiter;
        this.printLog(`Login erfolgreich: ${mitarbeiter?.MitarbeiterNr > 0 ? 'Ja' : 'Nein'}`);
        this.getStundeninfo();
      },
      error: (loginError: Error) => this.printError(`Login fehlgeschlagen: ${JSON.stringify(loginError)}`)
    });
  }

  private getStundeninfo(): void {
    this.printLog("Stundeninfo abrufen...");
    this.httpService.get<Stundeninfo>("/ZEI/Stundeninfo").subscribe({
      next: (stundeninfo: Stundeninfo) => this.printLog(`Stundeninfo abrufen erfolgreich, aktueller Stundensaldo: ${stundeninfo?.SaldoVortag}`),
      error: (stundeninfoError: Error) => this.printError(`Stundeninfo abrufen fehlgeschlagen: ${JSON.stringify(stundeninfoError)}`)
    });
  }

  private printLog(text: string): void {
    console.log(text);
    this.output += `${text}\r\n`;
  }

  private printError(text: string): void {
    console.error(text);
    this.output += `!!! FEHLER: ${text}\r\n`;
  }
}

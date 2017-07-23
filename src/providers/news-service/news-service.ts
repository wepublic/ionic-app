import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {API_ENDPOINT} from '../../app/app.config';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";

@Injectable()
export class NewsServiceProvider {

  newsDummies: Array<{
    id: number,
    content: string,
    html_content: string,
    time_created: string,
    last_modified: string,
    user: any,
  }>;

  constructor(public http: Http) {
    this.initDummies();
  }

  loadNews() {
    return Observable.of(this.newsDummies);
  }

  initDummies() {
    this.newsDummies = [
      {
        id: 1,
        content: "Voraussichtlich 48 Parteien dürfen zur Bundestagswahl antreten, darunter auch Gruppen wie Die Violetten, die Magdeburger Gartenpartei und das Bündnis Grundeinkommen. Insgesamt 40 Vereinigungen erteilte der Bundeswahlausschuss am Donnerstag und Freitag die Zulassung. Dazu kommen die Parteien, die bereits im Bundestag oder in Landtagen mit fünf oder mehr Abgeordneten vertreten sind, also CDU, CSU, SPD, Linke, Grüne, AfD, FDP und Freie Wähler.\r\n\r\n24 Vereinigungen, die ihre Zulassung beantragt hatten, wurden vom Aussschuss unter Leitung des Bundeswahlleiters Dieter Sarreither abgelehnt. Zum Teil hatten sie die Anmeldefrist verpasst oder andere formale Auflagen nicht erfüllt. So dürfen etwa die WasserPartei Deutschland-WPD, die Freie Heldenpartei Germany oder Der Blitz sich nicht den Wählern stellen. Mit dabei sind aber die NPD, die Piratenpartei und die Deutsche Kommunistische Partei.\r\n\r\nInsgesamt hatten 64 Vereinigungen ihre Teilnahme an der Bundestagswahl am 24. September beantragt. Bis zum 11. Juli können die Gruppen, die nicht zugelassen wurden, Beschwerde beim Bundesverfassungsgericht einlegen. Karlsruhe muss darüber bis zum 27. Juli entscheiden. (dpa)\r\n\r\nQuelle: [Tagesspiegel][1]\r\n\r\n  [1]: http://www.tagesspiegel.de/politik/zulassung-fuer-24-september-48-parteien-duerfen-zur-bundestagswahl-antreten/20034352.html \"Tagesspiegel\"",
        html_content: "<p>Voraussichtlich 48 Parteien dürfen zur Bundestagswahl antreten, darunter auch Gruppen wie Die Violetten, die Magdeburger Gartenpartei und das Bündnis Grundeinkommen. Insgesamt 40 Vereinigungen erteilte der Bundeswahlausschuss am Donnerstag und Freitag die Zulassung. Dazu kommen die Parteien, die bereits im Bundestag oder in Landtagen mit fünf oder mehr Abgeordneten vertreten sind, also CDU, CSU, SPD, Linke, Grüne, AfD, FDP und Freie Wähler.</p>\n<p>24 Vereinigungen, die ihre Zulassung beantragt hatten, wurden vom Aussschuss unter Leitung des Bundeswahlleiters Dieter Sarreither abgelehnt. Zum Teil hatten sie die Anmeldefrist verpasst oder andere formale Auflagen nicht erfüllt. So dürfen etwa die WasserPartei Deutschland-WPD, die Freie Heldenpartei Germany oder Der Blitz sich nicht den Wählern stellen. Mit dabei sind aber die NPD, die Piratenpartei und die Deutsche Kommunistische Partei.</p>\n<p>Insgesamt hatten 64 Vereinigungen ihre Teilnahme an der Bundestagswahl am 24. September beantragt. Bis zum 11. Juli können die Gruppen, die nicht zugelassen wurden, Beschwerde beim Bundesverfassungsgericht einlegen. Karlsruhe muss darüber bis zum 27. Juli entscheiden. (dpa)</p>\n<p>Quelle: <a href=\"http://www.tagesspiegel.de/politik/zulassung-fuer-24-september-48-parteien-duerfen-zur-bundestagswahl-antreten/20034352.html\" title=\"Tagesspiegel\">Tagesspiegel</a></p>",
        time_created: "2017-07-12T19:14:25.036903Z",
        last_modified: "2017-07-12T19:14:25.036947Z",
        user: {
          id: 5,
          username: "dorotheafranke",
          profile_pic: null
        }
      },
      {
        id: 2,
        content: "Die SPD hat nach Ansicht der rheinland-pfälzischen Ministerpräsidentin Malu Dreyer (SPD) bis zur Bundestagswahl noch Siegchancen - obwohl die Umfragewerte sinken. \r\n\r\n*\"Ich bin überzeugt davon, dass wir in der heißen Phase des Wahlkampfes mit einem guten Programm, einem guten Kandidaten Martin Schulz und einer geschlossenen Partei noch sehr viel erreichen können\"*, sagte Dreyer. Die SPD lasse sich durch Umfragen nicht unruhig machen. *\"Ich bin sehr zuversichtlich, dass wir noch kräftig zulegen werden und die Wahl gewinnen können.\"*",
        html_content: "<p>Die SPD hat nach Ansicht der rheinland-pfälzischen Ministerpräsidentin Malu Dreyer (SPD) bis zur Bundestagswahl noch Siegchancen - obwohl die Umfragewerte sinken. </p>\n<p><em>\"Ich bin überzeugt davon, dass wir in der heißen Phase des Wahlkampfes mit einem guten Programm, einem guten Kandidaten Martin Schulz und einer geschlossenen Partei noch sehr viel erreichen können\"</em>, sagte Dreyer. Die SPD lasse sich durch Umfragen nicht unruhig machen. <em>\"Ich bin sehr zuversichtlich, dass wir noch kräftig zulegen werden und die Wahl gewinnen können.\"</em></p>",
        time_created: "2017-07-12T19:15:56.113966Z",
        last_modified: "2017-07-12T19:16:40.124645Z",
        user: {
          id: 8,
          username: "karlfriedwilmsen",
          profile_pic: null
        }
      }
    ];
  }



}

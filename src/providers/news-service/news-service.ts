import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class NewsServiceProvider {

  newsDummies: Array<
  {
    id: number,
    date: string,
    title: string,
    content: string,
  }>;

  constructor() {
    this.initDummies();
  }

  loadNews() {
    return Observable.of(this.newsDummies);
  }

  initDummies() {
    this.newsDummies = [
      {
        id: 1,
        date: "10. Juli 2017",
        title: "FDP-Chef Lindner fordert offensives Zuwanderungsrecht",
        content: "Montag, 10. Juli, 09.19 Uhr: Der FDP-Vorsitzende Christian Lindner hat eine verstärkte Ausrichtung der " +
        "Zuwanderungspolitik auf deutsche Interessen gefordert. So müsse das Land bei der Anwerbung kompetenter " +
        "Fachkräfte und Forscher die nachlassende Anziehungskraft von Wissenschaftsnationen wie USA und Großbritannien" +
        " nutzen. \"Ich schaue neidvoll nach Frankreich, weil Emmanuel Macron dort nach der Kündigung des Pariser " +
        "Klimaabkommens durch Donald Trump großartige Naturwissenschaftler in sein Land einlädt, also eine aktive " +
        "Zuwanderungspolitik für Talente betreibt\", sagte Lindner der Deutschen Presse-Agentur in Berlin. " +
        "\"Das fehlt uns komplett - trotz eines Fachkräftemangels.\"Deutschland brauche \"eine offensive " +
        "Einwanderungsstrategie und die entsprechende Gesetzgebung\", sagte der Chef der seit 2013 nicht mehr im " +
        "Bundestag vertretenen, zuletzt aber wieder aufstrebenden FDP. \"Wir haben ein Fenster der Gelegenheit, das " +
        "genutzt werden muss, weil klassische Einwanderungsländer wie die USA und Großbritannien an Attraktivität " +
        "verloren haben.\"Allerdings sei Deutschland derzeit \"selbst nicht attraktiv aufgrund der Sprachbarriere und " +
        "unseres leistungsskeptischen bis -feindlichen Klimas. Die aufstiegswilligen Talente in der Welt suchen sich " +
        "andere Standorte\", sagte Lindner."
      },
      {
        id: 2,
        date: "09. Juli 2017",
        title: "Sonntagstrend: SPD kann Rückstand auf CDU verkürzen",
        content: "Die SPD von Kanzlerkandidat Martin Schulz kann in der Wählergunst leicht aufholen und den Rückstand auf" +
        " die Union um zwei Punkte verkürzen. Wenn am nächsten Sonntag ein neuer Bundestag gewählt würde, kämen die " +
        "Sozialdemokraten auf 25 Prozent (plus 1), CDU und CSU auf 38 Prozent (minus 1). Das ergab der \"Sonntagstrend\"" +
        ", den das Meinungsforschungsinstitut Emnid wöchentlich für die Bild am Sonntag erhebt. Drittstärkste Partei " +
        "wäre erneut die Linke mit neun Prozent, Grüne und FDP liegen wie in der Vorwoche bei acht Prozent. Die AfD " +
        "verharrt mit sieben Prozent auf dem tiefsten Stand seit Ende 2015. Für den \"Sonntagstrend\" hat Emnid 1878" +
        " repräsentativ ausgewählte Personen zwischen dem 30. Juni und dem 5. Juli befragt."
      },
      {
        id: 3,
        date: "08. Juli 2017",
        title: "Malu Dreyer: \"Wir lassen uns durch Umfragen nicht unruhig machen\"",
        content: "Die SPD hat nach Ansicht der rheinland-pfälzischen Ministerpräsidentin Malu Dreyer (SPD) bis zur" +
        " Bundestagswahl noch Siegchancen - obwohl die Umfragewerte sinken. \"Ich bin überzeugt davon, dass wir in der" +
        " heißen Phase des Wahlkampfes mit einem guten Programm, einem guten Kandidaten Martin Schulz und einer " +
        "geschlossenen Partei noch sehr viel erreichen können\", sagte Dreyer. Die SPD lasse sich durch Umfragen" +
        " nicht unruhig machen. \"Ich bin sehr zuversichtlich, dass wir noch kräftig zulegen werden und die Wahl " +
        "gewinnen können.\""
      },
      {
        id: 4,
        date: "07. Juli 2017",
        title: "48 Parteien dürfen zur Bundestagswahl antreten",
        content: "Voraussichtlich 48 Parteien dürfen zur Bundestagswahl antreten, darunter auch Gruppen wie Die Violetten," +
        " die Magdeburger Gartenpartei und das Bündnis Grundeinkommen. Insgesamt 40 Vereinigungen erteilte der" +
        " Bundeswahlausschuss am Donnerstag und Freitag die Zulassung. Dazu kommen die Parteien, die bereits im " +
        "Bundestag oder in Landtagen mit fünf oder mehr Abgeordneten vertreten sind, also CDU, CSU, SPD, Linke, Grüne," +
        " AfD, FDP und Freie Wähler.\n 24 Vereinigungen, die ihre Zulassung beantragt hatten, wurden vom Aussschuss " +
        "unter Leitung des Bundeswahlleiters Dieter Sarreither abgelehnt. Zum Teil hatten sie die Anmeldefrist verpasst" +
        " oder andere formale Auflagen nicht erfüllt. So dürfen etwa die WasserPartei Deutschland-WPD, die Freie " +
        "Heldenpartei Germany oder Der Blitz sich nicht den Wählern stellen. Mit dabei sind aber die NPD, die" +
        " Piratenpartei und die Deutsche Kommunistische Partei."
      }
    ];
  }

}

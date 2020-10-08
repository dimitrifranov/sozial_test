<template>
  <div class="center-items">
    <div class="h-screen w-screen max-w-md felx felx-col items-center pt-16">
      <!-- <h2 class="text-white text-xl">
        INFO
      </h2> -->
      <h2 class="text-white text-2xl">
        Impressum
      </h2>
      <section class="text-white font-light pb-10">
        Informationspflicht laut § 5 TMG. <br />
        <br />
        Dimitri Franov <br />
        <br />
        Mühlegasse 6, <br />
        4450 Sissach,<br />
        Schweiz <br />
        <br />
        E-Mail: dimitri@tschau.app
      </section>
      <section class="font-light text-sm text-white pb-10">
        <h3 class="text-xl pb-2">
          EU-Streitschlichtung
        </h3>
        <p>
          Gemäß Verordnung über Online-Streitbeilegung in
          Verbraucherangelegenheiten (ODR-Verordnung) möchten wir Sie über die
          Online-Streitbeilegungsplattform (OS-Plattform) informieren.
          Verbraucher haben die Möglichkeit, Beschwerden an die Online
          Streitbeilegungsplattform der Europäischen Kommission unter
          http://ec.europa.eu/odr?tid=321220111 zu richten. Die dafür
          notwendigen Kontaktdaten finden Sie oberhalb in unserem Impressum.
          <br /><br />
          Wir möchten Sie jedoch darauf hinweisen, dass wir nicht bereit oder
          verpflichtet sind, an Streitbeilegungsverfahren vor einer
          Verbraucherschlichtungsstelle teilzunehmen.
        </p>
        <h3 class="text-xl pb-2 pt-6">
          Haftung für Inhalte dieser Website
        </h3>
        <p>
          Wir entwickeln die Inhalte dieser Webseite ständig weiter und bemühen
          uns korrekte und aktuelle Informationen bereitzustellen. Laut
          Telemediengesetz (TMG) §7 (1) sind wir als Diensteanbieter für eigene
          Informationen, die wir zur Nutzung bereitstellen, nach den allgemeinen
          Gesetzen verantwortlich. Leider können wir keine Haftung für die
          Korrektheit aller Inhalte auf dieser Webseite übernehmen, speziell für
          jene die seitens Dritter bereitgestellt wurden. Als Diensteanbieter im
          Sinne der §§ 8 bis 10 sind wir nicht verpflichtet, die von ihnen
          übermittelten oder gespeicherten Informationen zu überwachen oder nach
          Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
          <br /><br />
          Unsere Verpflichtungen zur Entfernung von Informationen oder zur
          Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen
          aufgrund von gerichtlichen oder behördlichen Anordnungen bleiben auch
          im Falle unserer Nichtverantwortlichkeit nach den §§ 8 bis 10
          unberührt.
          <br /><br />
          Sollten Ihnen problematische oder rechtswidrige Inhalte auffallen,
          bitte wir Sie uns umgehend zu kontaktieren, damit wir die
          rechtswidrigen Inhalte entfernen können. Sie finden die Kontaktdaten
          im Impressum.
        </p>
        <h3 class="text-xl pb-2 pt-6">
          Haftung für Links auf dieser Website
        </h3>
        <p>
          Unsere Webseite enthält Links zu anderen Webseiten für deren Inhalt
          wir nicht verantwortlich sind. Haftung für verlinkte Websites besteht
          für uns nicht, da wir keine Kenntnis rechtswidriger Tätigkeiten hatten
          haben, uns solche Rechtswidrigkeiten auch bisher nicht aufgefallen
          sind und wir Links sofort entfernen würden, wenn uns
          Rechtswidrigkeiten bekannt werden.
          <br /><br />
          Wenn Ihnen rechtswidrige Links auf unserer Website auffallen, bitte
          wir Sie uns zu kontaktieren. Sie finden die Kontaktdaten im Impressum.
          <br /><br />
          Urheberrechtshinweis Alle Inhalte dieser Webseite (Bilder, Fotos,
          Texte, Videos) unterliegen dem Urheberrecht der Bundesrepublik
          Deutschland. Bitte fragen Sie uns bevor Sie die Inhalte dieser Website
          verbreiten, vervielfältigen oder verwerten wie zum Beispiel auf
          anderen Websites erneut veröffentlichen. Falls notwendig, werden wir
          die unerlaubte Nutzung von Teilen der Inhalte unserer Seite rechtlich
          verfolgen.
          <br /><br />
          Sollten Sie auf dieser Webseite Inhalte finden, die das Urheberrecht
          verletzen, bitten wir Sie uns zu kontaktieren.
        </p>
      </section>
      <a
        href="/Datenschutzerklärung.pdf"
        download="download"
        class="mb-5 block font-light bg-transparent h-10 hover:bg-white text-white hover:text-grey py-2 px-4 mt-2 border border-white hover:border-transparent transition-colors duration-200 disabled:opacity-75 disbaled:text-error"
        >Datenschutzerklärung als PDF</a
      >
      <a
        href="/Nutzungsbedingungen-Tschau.pdf"
        download="download"
        class="mb-16 block font-light bg-transparent h-10 hover:bg-white text-white hover:text-grey py-2 px-4 mt-2 border border-white hover:border-transparent transition-colors duration-200 disabled:opacity-75 disbaled:text-error"
        >Nutzungsbedingungen als PDF</a
      >
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: 'Informationen über Tschau.app',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Hier findest du Informationen über Tschau, sowie Datenschutzerklärung und Nutzungsbedingungen'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped></style>

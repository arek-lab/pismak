// lib/legal/polityka-prywatnosci.tsx
// Treść polityki prywatności do użycia w LegalOverlay
// NIE jest to osobna strona — komponent treści renderowany wewnątrz modalu

import React from 'react'

export const POLITYKA_TYTUL = 'Polityka prywatności'

// ── Pomocnicze komponenty typograficzne ─────────────────────────────────────

function SectionHeading({ number, title }: { number: string; title: string }) {
  return (
    <h2 className="flex items-baseline gap-2 font-['Playfair_Display'] text-xl font-bold text-[#1A1A1A] mt-10 mb-3">
      <span className="text-[#1B4332] font-['DM_Mono'] text-sm font-normal select-none shrink-0">
        {number}
      </span>
      {title}
    </h2>
  )
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[#374151] leading-relaxed mb-3 text-sm font-['DM_Sans']">{children}</p>
  )
}

function Ol({ children }: { children: React.ReactNode }) {
  return (
    <ol className="list-decimal list-outside pl-5 space-y-2 mb-4 text-[#374151] text-sm leading-relaxed font-['DM_Sans']">
      {children}
    </ol>
  )
}

function Li({ children }: { children: React.ReactNode }) {
  return <li className="pl-1">{children}</li>
}

function Ul({ children }: { children: React.ReactNode }) {
  return <ul className="list-none pl-0 space-y-2 my-3">{children}</ul>
}

function BulletLi({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3 text-[#374151] text-sm leading-relaxed font-['DM_Sans']">
      <span className="mt-[0.4rem] w-1.5 h-1.5 rounded-full bg-[#1B4332] shrink-0" />
      <span>{children}</span>
    </li>
  )
}

function InfoBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-5 border-l-4 border-[#1B4332] bg-[#F5F4F0] px-4 py-3 rounded-r-lg">
      <p className="text-[#1A1A1A] text-sm leading-relaxed font-['DM_Sans']">{children}</p>
    </div>
  )
}

function Table({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto my-4">
      <table className="w-full text-sm font-['DM_Sans'] border-collapse">
        {children}
      </table>
    </div>
  )
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="text-left text-xs font-medium text-[#6B6B6B] uppercase tracking-wider px-3 py-2 bg-[#F5F4F0] border border-[#E8E4DC]">
      {children}
    </th>
  )
}

function Td({ children }: { children: React.ReactNode }) {
  return (
    <td className="px-3 py-2 text-[#374151] border border-[#E8E4DC] align-top leading-relaxed">
      {children}
    </td>
  )
}

function Divider() {
  return <hr className="my-8 border-t border-[#E8E4DC]" />
}

// ── Główna funkcja treści ────────────────────────────────────────────────────

export function PolitykaPrywatnosci() {
  return (
    <div>

      <P>
        Niniejsza Polityka prywatności opisuje, jakie dane są przetwarzane w związku z
        korzystaniem z serwisu Pismak (pismak.pl), w jaki sposób są wykorzystywane oraz jakie
        prawa przysługują użytkownikowi.
      </P>

      <Divider />

      {/* §1 */}
      <SectionHeading number="§1" title="Administrator danych" />
      <Ol>
        <Li>
          Administratorem danych osobowych użytkowników serwisu pismak.pl jest podmiot prowadzący
          działalność pod marką Prywaciarz, powiązany z serwisem prywaciarz.pl.
          {/* TODO: uzupełnić pełną nazwę firmy, adres i dane kontaktowe */}
        </Li>
        <Li>
          W sprawach dotyczących ochrony danych osobowych można kontaktować się pod adresem
          e-mail: {/* TODO: dodać adres e-mail do kontaktu w sprawie RODO */}
          <span className="text-[#6B6B6B]">[adres e-mail — uzupełnić]</span>.
        </Li>
      </Ol>

      <Divider />

      {/* §2 */}
      <SectionHeading number="§2" title="Dane przetwarzane lokalnie — formularze" />

      <InfoBox>
        Dane wpisywane w formularzach generatorów pism (nazwy firm, adresy, kwoty itd.)
        przetwarzane są wyłącznie lokalnie — w przeglądarce użytkownika. Nie są przesyłane
        na serwery właściciela Serwisu ani przechowywane po zamknięciu przeglądarki.
      </InfoBox>

      <Ol>
        <Li>
          Serwis Pismak działa w architekturze browser-only. Żadne dane osobowe wprowadzone
          przez użytkownika do formularzy nie opuszczają jego urządzenia.
        </Li>
        <Li>
          Właściciel Serwisu nie ma dostępu do treści pism wygenerowanych przez użytkownika
          ani do danych w nich zawartych.
        </Li>
        <Li>
          Podstawą prawną przetwarzania danych w formularzach jest uzasadniony interes
          użytkownika (art. 6 ust. 1 lit. f RODO) — dane przetwarzane są wyłącznie w jego
          przeglądarce, na jego żądanie, w celu wygenerowania dokumentu.
        </Li>
      </Ol>

      <Divider />

      {/* §3 */}
      <SectionHeading number="§3" title="Pliki cookie i technologie śledzące" />
      <Ol>
        <Li>
          Serwis korzysta z plików cookie — małych plików tekstowych zapisywanych na urządzeniu
          użytkownika. Część z nich jest niezbędna do działania Serwisu, część służy do analizy
          ruchu i optymalizacji reklam.
        </Li>
        <Li>
          Użytkownik ma możliwość wyboru zakresu stosowanych plików cookie za pomocą banera
          wyświetlanego przy pierwszym wejściu na stronę.
        </Li>
        <Li>
          Serwis stosuje następujące kategorie plików cookie:
        </Li>
      </Ol>

      <Table>
        <thead>
          <tr>
            <Th>Kategoria</Th>
            <Th>Cel</Th>
            <Th>Podstawa prawna</Th>
            <Th>Dostawca</Th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <Td><strong>Niezbędne</strong></Td>
            <Td>Prawidłowe działanie Serwisu, zapamiętanie preferencji cookie</Td>
            <Td>Uzasadniony interes (art. 6 ust. 1 lit. f RODO)</Td>
            <Td>Pismak.pl</Td>
          </tr>
          <tr>
            <Td><strong>Analityczne</strong></Td>
            <Td>Analiza ruchu, liczba odwiedzin, zachowanie użytkowników</Td>
            <Td>Zgoda użytkownika (art. 6 ust. 1 lit. a RODO)</Td>
            <Td>Google Analytics 4</Td>
          </tr>
          <tr>
            <Td><strong>Marketingowe</strong></Td>
            <Td>Pomiar konwersji z reklam Google Ads, optymalizacja kampanii</Td>
            <Td>Zgoda użytkownika (art. 6 ust. 1 lit. a RODO)</Td>
            <Td>Google Ads</Td>
          </tr>
        </tbody>
      </Table>

      <Ol>
        <Li>
          Cookies analityczne i marketingowe są aktywowane wyłącznie po wyrażeniu zgody przez
          użytkownika. Wybór "Tylko niezbędne" oznacza brak zgody na cookies analityczne
          i marketingowe — strona działa normalnie, lecz Serwis nie zbiera danych o ruchu
          i nie mierzy skuteczności reklam.
        </Li>
        <Li>
          Preferencje dotyczące cookies są zapamiętywane przez 12 miesięcy. Użytkownik może
          je zmienić w dowolnym momencie, klikając link "Ustawienia cookies" w stopce Serwisu.
        </Li>
        <Li>
          Szczegółowe informacje o plikach cookie stosowanych przez Google dostępne są w
          polityce prywatności Google:{' '}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-[#1B4332] hover:opacity-75 transition-opacity"
          >
            policies.google.com/privacy
          </a>.
        </Li>
      </Ol>

      <Divider />

      {/* §4 */}
      <SectionHeading number="§4" title="Google Tag Manager i Consent Mode" />
      <Ol>
        <Li>
          Serwis korzysta z Google Tag Manager (GTM) — narzędzia do zarządzania skryptami
          analitycznymi i marketingowymi. GTM działa w trybie Consent Mode v2, co oznacza
          że skrypty Google są aktywowane lub ograniczane automatycznie na podstawie wyboru
          użytkownika w banerze cookie.
        </Li>
        <Li>
          W przypadku braku zgody (wybór "Tylko niezbędne") GTM nie przekazuje danych
          osobowych do Google Analytics ani Google Ads. Google może zbierać ograniczone,
          zanonimizowane sygnały zgodnie z własną polityką prywatności.
        </Li>
        <Li>
          Dane zbierane przez Google Analytics i Google Ads mogą być przekazywane do serwerów
          Google zlokalizowanych poza Europejskim Obszarem Gospodarczym, w tym do Stanów
          Zjednoczonych. Przekazywanie odbywa się na podstawie standardowych klauzul
          umownych zatwierdzonych przez Komisję Europejską.
        </Li>
      </Ol>

      <Divider />

      {/* §5 */}
      <SectionHeading number="§5" title="Prawa użytkownika" />
      <P>
        W związku z przetwarzaniem danych osobowych użytkownikowi przysługują następujące prawa:
      </P>
      <Ul>
        <BulletLi>
          <strong>Prawo dostępu</strong> — prawo do uzyskania informacji o przetwarzanych danych
          (art. 15 RODO).
        </BulletLi>
        <BulletLi>
          <strong>Prawo do sprostowania</strong> — prawo do poprawiania nieprawidłowych danych
          (art. 16 RODO).
        </BulletLi>
        <BulletLi>
          <strong>Prawo do usunięcia</strong> — prawo do żądania usunięcia danych ("prawo do
          bycia zapomnianym", art. 17 RODO).
        </BulletLi>
        <BulletLi>
          <strong>Prawo do ograniczenia przetwarzania</strong> — prawo do żądania wstrzymania
          przetwarzania danych (art. 18 RODO).
        </BulletLi>
        <BulletLi>
          <strong>Prawo do wycofania zgody</strong> — zgoda na cookies analityczne i marketingowe
          może być wycofana w dowolnym momencie poprzez zmianę ustawień w banerze cookie
          (link w stopce Serwisu). Wycofanie zgody nie wpływa na legalność przetwarzania
          przed jej wycofaniem.
        </BulletLi>
        <BulletLi>
          <strong>Prawo do skargi</strong> — prawo do wniesienia skargi do Prezesa Urzędu Ochrony
          Danych Osobowych (ul. Stawki 2, 00-193 Warszawa, uodo.gov.pl).
        </BulletLi>
      </Ul>
      <P>
        Wnioski dotyczące praw można kierować na adres e-mail administratora podany w §1.
      </P>

      <Divider />

      {/* §6 */}
      <SectionHeading number="§6" title="Okres przechowywania danych" />
      <Ol>
        <Li>
          Dane z formularzy generatorów pism nie są przechowywane przez Serwis — przetwarzane
          są wyłącznie lokalnie w przeglądarce użytkownika i usuwane po zamknięciu karty.
        </Li>
        <Li>
          Dane analityczne zbierane przez Google Analytics przechowywane są przez okres
          14 miesięcy, zgodnie z ustawieniami domyślnymi GA4.
        </Li>
        <Li>
          Preferencje cookie użytkownika przechowywane są przez 12 miesięcy od daty
          ich ustawienia.
        </Li>
      </Ol>

      <Divider />

      {/* §7 */}
      <SectionHeading number="§7" title="Zmiany polityki prywatności" />
      <Ol>
        <Li>
          Właściciel Serwisu zastrzega sobie prawo do zmiany niniejszej Polityki prywatności,
          w szczególności w związku ze zmianami przepisów prawa lub rozwojem Serwisu.
        </Li>
        <Li>
          Zmiany wchodzą w życie z dniem ich opublikowania w Serwisie.
        </Li>
        <Li>
          W przypadku istotnych zmian dotyczących przetwarzania danych opartego na zgodzie,
          użytkownik zostanie poproszony o ponowne wyrażenie zgody.
        </Li>
      </Ol>

    </div>
  )
}
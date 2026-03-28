// lib/legal/regulamin.tsx
// Treść regulaminu do użycia w LegalOverlay
// NIE jest to osobna strona — to komponent treści renderowany wewnątrz modalu

import React from 'react'

export const REGULAMIN_TYTUL = 'Regulamin serwisu Pismak'

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

function Disclaimer({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-5 border-l-4 border-[#1B4332] bg-[#F5F4F0] px-4 py-3 rounded-r-lg">
      <p className="text-[#1A1A1A] text-sm leading-relaxed font-medium font-['DM_Sans']">
        {children}
      </p>
    </div>
  )
}

function Divider() {
  return <hr className="my-8 border-t border-[#E8E4DC]" />
}

// ── Główna funkcja treści ────────────────────────────────────────────────────

export function RegulaminContent() {
  return (
    <div>

      {/* §1 */}
      <SectionHeading number="§1" title="Postanowienia ogólne" />
      <Ol>
        <Li>
          Niniejszy Regulamin określa zasady korzystania z serwisu internetowego dostępnego pod
          adresem pismak.pl (dalej: „Serwis&rdquo;), jego przeznaczenie oraz zakres odpowiedzialności
          jego twórców i właścicieli.
        </Li>
        <Li>
          Serwis Pismak jest narzędziem służącym do generowania wzorów pism firmowych, w tym
          m.in. wezwań do zapłaty, odpowiedzi na reklamacje oraz odpowiedzi na opinie w serwisach
          internetowych.
        </Li>
        <Li>
          Serwis działa wyłącznie w przeglądarce internetowej użytkownika. Żadne dane wprowadzone
          przez użytkownika nie są przesyłane ani przechowywane na serwerach właściciela Serwisu.
        </Li>
        <Li>
          Korzystanie z Serwisu jest bezpłatne i nie wymaga rejestracji ani zakładania konta.
        </Li>
        <Li>
          Właścicielem i administratorem Serwisu jest podmiot prowadzący działalność pod marką
          Prywaciarz, powiązany z serwisem prywaciarz.pl.
          {/* TODO: uzupełnić pełną nazwę firmy i NIP gdy dostępne */}
        </Li>
      </Ol>

      <Divider />

      {/* §2 */}
      <SectionHeading number="§2" title="Charakter Serwisu — nie jest to porada prawna" />

      <Disclaimer>
        WAŻNE: Serwis Pismak nie świadczy usług prawnych, doradztwa prawnego ani pomocy prawnej
        w jakiejkolwiek formie. Generowane pisma stanowią wyłącznie ogólne wzory dokumentów o
        charakterze informacyjno-pomocniczym i nie zastępują profesjonalnej porady prawnej
        udzielanej przez radcę prawnego, adwokata ani innego uprawnionego prawnika.
      </Disclaimer>

      <Ol>
        <Li>
          Pismak jest narzędziem informatycznym generującym szablony pism na podstawie danych
          wprowadzonych przez użytkownika. Serwis nie analizuje sytuacji prawnej użytkownika, nie
          ocenia zasadności roszczeń ani nie doradza w zakresie strategii postępowania.
        </Li>
        <Li>
          Wzory pism dostępne w Serwisie mają charakter ogólny i zostały przygotowane bez
          uwzględnienia indywidualnej sytuacji prawnej, faktycznej ani gospodarczej użytkownika.
        </Li>
        <Li>
          Użytkownik, przed użyciem wygenerowanego pisma, powinien:
          <Ul>
            <BulletLi>
              samodzielnie zweryfikować, czy wzór jest odpowiedni dla jego konkretnej sytuacji;
            </BulletLi>
            <BulletLi>
              sprawdzić aktualność przepisów prawnych, do których może odnosić się treść pisma;
            </BulletLi>
            <BulletLi>
              skonsultować się z prawnikiem, jeśli sprawa ma charakter złożony, sporny lub wiąże
              się z istotnymi konsekwencjami prawnymi lub finansowymi.
            </BulletLi>
          </Ul>
        </Li>
        <Li>
          Właściciel Serwisu dokłada starań, aby wzory pism były poprawne merytorycznie i aktualne,
          jednak nie gwarantuje ich kompletności, aktualności ani skuteczności w każdym przypadku.
        </Li>
      </Ol>

      <Divider />

      {/* §3 */}
      <SectionHeading number="§3" title="Wyłączenie odpowiedzialności" />

      <Disclaimer>
        Właściciel Serwisu oraz jego współpracownicy, redaktorzy i twórcy treści nie ponoszą
        jakiejkolwiek odpowiedzialności za skutki prawne, finansowe ani inne wynikające z użycia
        lub niemożności użycia wygenerowanych pism — w tym za ich nieskuteczność, wadliwość
        prawną, odrzucenie przez organy lub podmioty trzecie, ani za jakiekolwiek szkody
        bezpośrednie lub pośrednie poniesione przez użytkownika lub osoby trzecie.
      </Disclaimer>

      <Ol>
        <Li>
          Właściciel Serwisu wyłącza odpowiedzialność w szczególności za:
          <Ul>
            <BulletLi>
              nieskuteczność wygenerowanego pisma — np. niewyegzekwowanie należności, odmowę
              uznania reklamacji lub inne niezamierzone skutki jego użycia;
            </BulletLi>
            <BulletLi>
              wadliwość prawną pisma, w tym jego niezgodność z obowiązującymi przepisami prawa,
              jeżeli przepisy uległy zmianie po opublikowaniu wzoru lub wzór nie odpowiada
              indywidualnej sytuacji użytkownika;
            </BulletLi>
            <BulletLi>
              błędy lub pominięcia w treści pisma wynikające z nieprawidłowego lub niekompletnego
              wypełnienia formularza przez użytkownika;
            </BulletLi>
            <BulletLi>
              skutki użycia pisma wobec podmiotów niebędących jego adresatami lub w sytuacjach, do
              których wzorzec nie był przeznaczony;
            </BulletLi>
            <BulletLi>
              konsekwencje prawne, finansowe lub reputacyjne wynikające z wysłania lub opublikowania
              wygenerowanego pisma;
            </BulletLi>
            <BulletLi>
              problemy techniczne, niedostępność Serwisu lub utratę danych wprowadzonych przez
              użytkownika w formularzu.
            </BulletLi>
          </Ul>
        </Li>
        <Li>
          Wyłączenie odpowiedzialności obejmuje zarówno odpowiedzialność deliktową, jak i
          kontraktową, do maksymalnego zakresu dopuszczalnego przez obowiązujące przepisy prawa.
        </Li>
        <Li>
          Korzystając z Serwisu, użytkownik przyjmuje do wiadomości i akceptuje, że wzory pism
          mogą nie być odpowiednie dla jego indywidualnej sytuacji i bierze na siebie pełną
          odpowiedzialność za decyzję o ich użyciu.
        </Li>
      </Ol>

      <Divider />

      {/* §4 */}
      <SectionHeading number="§4" title="Obowiązki użytkownika" />
      <Ol>
        <Li>
          Użytkownik zobowiązany jest do korzystania z Serwisu zgodnie z jego przeznaczeniem oraz
          obowiązującymi przepisami prawa.
        </Li>
        <Li>
          Przed wysłaniem lub opublikowaniem wygenerowanego pisma użytkownik ma obowiązek:
          <Ul>
            <BulletLi>
              sprawdzić poprawność i kompletność danych wprowadzonych do formularza;
            </BulletLi>
            <BulletLi>
              zweryfikować, czy wybrany wzór pisma jest adekwatny do jego sytuacji prawnej i
              faktycznej;
            </BulletLi>
            <BulletLi>
              upewnić się, że treść pisma jest zgodna z aktualnym stanem prawnym;
            </BulletLi>
            <BulletLi>
              ocenić zasadność i proporcjonalność żądań lub twierdzeń zawartych w piśmie.
            </BulletLi>
          </Ul>
        </Li>
        <Li>
          W przypadku wątpliwości co do prawidłowości, skuteczności lub odpowiedniości pisma,
          użytkownik powinien zasięgnąć porady profesjonalnego prawnika przed jego użyciem.
        </Li>
        <Li>
          Użytkownik ponosi wyłączną odpowiedzialność za treść pism, które wysyła lub publikuje z
          użyciem wzorów wygenerowanych w Serwisie.
        </Li>
      </Ol>

      <Divider />

      {/* §5 */}
      <SectionHeading number="§5" title="Ochrona danych osobowych" />
      <Ol>
        <Li>
          Serwis Pismak przetwarza dane wyłącznie lokalnie — w przeglądarce użytkownika. Dane
          wpisane w formularzach nie są przesyłane na żadne serwery ani przechowywane przez
          właściciela Serwisu.
        </Li>
        <Li>
          Serwis może korzystać z narzędzi analitycznych (np. Google Analytics / Google Tag
          Manager) zbierających anonimowe dane o ruchu w Serwisie, zgodnie z polityką prywatności
          dostawcy tych narzędzi.
        </Li>
        <Li>
          Szczegółowe informacje o przetwarzaniu danych dostępne są w Polityce Prywatności Serwisu.
        </Li>
      </Ol>

      <Divider />

      {/* §6 */}
      <SectionHeading number="§6" title="Własność intelektualna" />
      <Ol>
        <Li>
          Szablony pism, teksty, grafiki, kod źródłowy oraz pozostałe elementy Serwisu są
          własnością właściciela Serwisu lub podmiotów, od których właściciel uzyskał stosowne
          licencje.
        </Li>
        <Li>
          Wygenerowane przez użytkownika pisma mogą być przez niego swobodnie używane do celów
          prywatnych i zawodowych. Użytkownik uzyskuje niewyłączną, nieprzenoszalną licencję na
          korzystanie z wygenerowanych treści wyłącznie na własny użytek. Pisma nie mogą być
          odsprzedawane ani dystrybuowane komercyjnie jako produkt samodzielny.
        </Li>
        <Li>
          Kopiowanie, modyfikowanie ani rozpowszechnianie elementów Serwisu (kodu, szablonów,
          interfejsu) bez pisemnej zgody właściciela jest zabronione.
        </Li>
      </Ol>

      <Divider />

      {/* §7 */}
      <SectionHeading number="§7" title="Zmiany Regulaminu" />
      <Ol>
        <Li>
          Właściciel Serwisu zastrzega sobie prawo do zmiany niniejszego Regulaminu w dowolnym
          czasie.
        </Li>
        <Li>Zmiany Regulaminu wchodzą w życie z dniem ich opublikowania w Serwisie.</Li>
        <Li>
          Dalsze korzystanie z Serwisu po opublikowaniu zmienionego Regulaminu oznacza akceptację
          nowej treści.
        </Li>
      </Ol>

      <Divider />

      {/* §8 */}
      <SectionHeading number="§8" title="Postanowienia końcowe" />
      <Ol>
        <Li>
          W sprawach nieuregulowanych niniejszym Regulaminem zastosowanie mają powszechnie
          obowiązujące przepisy prawa polskiego, w szczególności Kodeks cywilny oraz ustawa o
          świadczeniu usług drogą elektroniczną.
        </Li>
        <Li>
          Wszelkie spory wynikające z korzystania z Serwisu rozpatrywane będą przez sąd właściwy
          miejscowo dla siedziby właściciela Serwisu.
        </Li>
        <Li>
          Jeżeli którekolwiek z postanowień niniejszego Regulaminu okaże się nieważne lub
          nieskuteczne, pozostałe postanowienia zachowują pełną moc wiążącą.
        </Li>
        <Li>
          Regulamin dostępny jest w Serwisie w każdym czasie i może być zapisany lub wydrukowany
          przez użytkownika.
        </Li>
      </Ol>

    </div>
  )
}
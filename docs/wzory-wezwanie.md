
<!-- ============================================================ -->
<!-- WZOR_1: STANDARDOWE_WEZWANIE                                 -->
<!-- Plik źródłowy: Wzor1_Standardowe_Wezwanie.docx               -->
<!-- Zastosowanie: Pierwsze wezwanie do zapłaty — pełna forma      -->
<!-- Zmienne: NAZWA_WIERZYCIELA, NIP_WIERZYCIELA, ADRES_WIERZYCIELA, NAZWA_DLUZNIKA, ADRES_DLUZNIKA, MIEJSCOWOSC, DATA_WYSTAWIENIA, NUMER_FAKTURY, DATA_FAKTURY, KWOTA_NALEZNOSCI, WALUTA, TERMIN_ZAPLATY, KWOTA_ODSETEK_DO_DNIA, KWOTA_LACZNIE, NUMER_KONTA -->
<!-- ============================================================ -->

# WZÓR 1 — STANDARDOWE WEZWANIE DO ZAPŁATY

**WEZWANIE DO ZAPŁATY**

Dokument wygenerowany na podstawie art. 455 KC i art. 481 KC

## I. Dane stron

| **Wierzyciel:** | **{{NAZWA_WIERZYCIELA}}** |
|---|---|
| **Adres:** | {{ADRES_WIERZYCIELA}} |
| **NIP:** | {{NIP_WIERZYCIELA}} |

| **Dłużnik:** | **{{NAZWA_DLUZNIKA}}** |
|---|---|
| **Adres:** | {{ADRES_DLUZNIKA}} |

| **Miejscowość i data:** | {{MIEJSCOWOSC}}, dnia {{DATA_WYSTAWIENIA}} r. |
|---|---|

## II. Wezwanie do zapłaty

Działając w imieniu **{{NAZWA_WIERZYCIELA}}**, niniejszym wzywamy Państwa do niezwłocznego uregulowania zaległej należności wynikającej z faktury VAT nr **{{NUMER_FAKTURY}}** z dnia **{{DATA_FAKTURY}}** r.

Pomimo upływu terminu płatności, należność w kwocie **{{KWOTA_NALEZNOSCI}} {{WALUTA}}** nie została dotychczas uregulowana. Wzywamy Państwa do jej zapłaty w terminie **{{TERMIN_ZAPLATY}}** dni od dnia doręczenia niniejszego pisma, zgodnie z art. 455 Kodeksu cywilnego.

## III. Zestawienie należności

| **Pozycja** | **Kwota ({{WALUTA}})** |
|---|---|
| Należność główna (faktura {{NUMER_FAKTURY}}) | {{KWOTA_NALEZNOSCI}} |
| Odsetki ustawowe za opóźnienie (art. 481 KC, 9,25% rocznie) do dnia wystawienia wezwania | {{KWOTA_ODSETEK_DO_DNIA}} |
| **ŁĄCZNA KWOTA DO ZAPŁATY** | **{{KWOTA_LACZNIE}}** |

## IV. Dane do przelewu

| Proszę dokonać przelewu na następujący rachunek bankowy: Numer konta: **{{NUMER_KONTA}}** Odbiorca: **{{NAZWA_WIERZYCIELA}}** Tytuł przelewu: Zapłata faktury {{NUMER_FAKTURY}} — wezwanie do zapłaty |
|---|

## V. Konsekwencje braku zapłaty

Informujemy, że w przypadku bezskutecznego upływu wyznaczonego terminu zapłaty, wierzyciel **skieruje sprawę na drogę postępowania sądowego** bez dodatkowego uprzedzenia. W takim przypadku dłużnik zobowiązany będzie do pokrycia — oprócz należności głównej i narastających odsetek — **kosztów postępowania sądowego oraz kosztów zastępstwa procesowego.**

Odsetki ustawowe za opóźnienie naliczane są na podstawie **art. 481 § 2 Kodeksu cywilnego** w wysokości **9,25% rocznie** (stopa referencyjna NBP 3,75% + 5,5 pkt proc., stan na marzec 2026 r.) i będą naliczane aż do dnia faktycznej zapłaty.

| _____________________________ podpis osoby uprawnionej / pieczęć firmowa (opcjonalnie) |  |
|---|---|

> **Podstawa prawna:** art. 455 KC (wymagalność świadczenia), art. 481 KC (odsetki za opóźnienie). Odsetki wyliczone wg stopy obowiązującej od 5 marca 2026 r. Wzór ma charakter informacyjny i nie stanowi porady prawnej.

---

<!-- ============================================================ -->
<!-- WZOR_2: OSTATECZNE_PRZEDSADOWE_WEZWANIE                      -->
<!-- Plik źródłowy: Wzor2_Ostateczne_Przedsądowe_Wezwanie.docx    -->
<!-- Zastosowanie: Ostateczne wezwanie przed skierowaniem do sądu  -->
<!-- Zmienne: NAZWA_WIERZYCIELA, NIP_WIERZYCIELA, ADRES_WIERZYCIELA, NAZWA_DLUZNIKA, ADRES_DLUZNIKA, MIEJSCOWOSC, DATA_WYSTAWIENIA, DATA_POPRZEDNIEGO_WEZWANIA, NUMER_FAKTURY, DATA_FAKTURY, KWOTA_NALEZNOSCI, WALUTA, TERMIN_ZAPLATY, KWOTA_ODSETEK_NALICZONYCH, KWOTA_LACZNIE, NUMER_KONTA, INFORMACJA_O_UGODZIE -->
<!-- ============================================================ -->

# WZÓR 2 — OSTATECZNE PRZEDSĄDOWE WEZWANIE DO ZAPŁATY

**OSTATECZNE PRZEDSĄDOWE WEZWANIE DO ZAPŁATY**

Wysyłane na podstawie art. 455 i art. 481 KC — ostateczna szansa ugodowego zakończenia sprawy

> ⚠ **WAŻNE:** Niniejsze pismo stanowi ostateczne wezwanie przed skierowaniem sprawy do sądu. Brak zapłaty w wyznaczonym terminie skutkować będzie wszczęciem postępowania sądowego.

## I. Dane stron

| **Wierzyciel:** | **{{NAZWA_WIERZYCIELA}}** |
|---|---|
| **Adres:** | {{ADRES_WIERZYCIELA}} |
| **NIP:** | {{NIP_WIERZYCIELA}} |

| **Dłużnik:** | **{{NAZWA_DLUZNIKA}}** |
|---|---|
| **Adres:** | {{ADRES_DLUZNIKA}} |

| **Miejscowość i data:** | {{MIEJSCOWOSC}}, dnia {{DATA_WYSTAWIENIA}} r. |
|---|---|

## II. Przebieg dotychczasowej korespondencji

Pismem z dnia **{{DATA_POPRZEDNIEGO_WEZWANIA}}** r. wzywaliśmy Państwa do zapłaty należności wynikającej z faktury VAT nr **{{NUMER_FAKTURY}}** z dnia **{{DATA_FAKTURY}}** r. Pomimo upływu wyznaczonego terminu oraz dotychczasowych wezwań, należność nie została uregulowana.

W związku z powyższym, działając na podstawie **art. 455 Kodeksu cywilnego**, wzywamy Państwa po raz ostatni do zapłaty całości zaległej należności wraz z naliczonymi odsetkami w nieprzekraczalnym terminie **{{TERMIN_ZAPLATY}} dni** od dnia doręczenia niniejszego pisma.

## III. Zestawienie należności

| **Pozycja** | **Kwota ({{WALUTA}})** |
|---|---|
| Należność główna (faktura {{NUMER_FAKTURY}}) | {{KWOTA_NALEZNOSCI}} |
| Odsetki ustawowe za opóźnienie (art. 481 KC, 9,25% rocznie) naliczone na dzień poprzedniego wezwania | {{KWOTA_ODSETEK_NALICZONYCH}} |
| Dalsze odsetki narastające do dnia zapłaty | (naliczane bieżąco) |
| **MINIMALNA KWOTA DO ZAPŁATY** | **{{KWOTA_LACZNIE}}** |

## IV. Dane do przelewu

| Numer konta: **{{NUMER_KONTA}}** / Odbiorca: **{{NAZWA_WIERZYCIELA}}** / Tytuł: Ostateczna zapłata faktury {{NUMER_FAKTURY}} |
|---|

## V. Możliwość ugodowego zakończenia sprawy

{{INFORMACJA_O_UGODZIE}}

## VI. Konsekwencje braku zapłaty

W przypadku bezskutecznego upływu powyższego terminu, sprawa zostanie **bezzwłocznie skierowana do właściwego sądu**. Wierzyciel będzie żądał zasądzenia: należności głównej, odsetek ustawowych za opóźnienie (**art. 481 KC**) naliczanych aż do dnia zapłaty — aktualnie **9,25% rocznie** — oraz zwrotu kosztów postępowania sądowego i zastępstwa procesowego.

Łączne koszty sądowe (wpis + zastępstwo procesowe) mogą znacznie przewyższyć wartość sporu. Ugodowe zakończenie sprawy leży w obopólnym interesie.

| _____________________________ podpis osoby uprawnionej / pieczęć firmowa (opcjonalnie) |  |
|---|---|

> **Podstawa prawna:** art. 455 KC, art. 481 KC, art. 98 KPC (koszty procesu). Odsetki 9,25% rocznie — stan na 5 marca 2026 r. (stopa ref. NBP 3,75% + 5,5 pp). Wzór ma charakter informacyjny i nie stanowi porady prawnej.

---

<!-- ============================================================ -->
<!-- WZOR_3: UPROSZCZONE_WEZWANIE                                  -->
<!-- Plik źródłowy: Wzor3_Uproszczone_Wezwanie.docx               -->
<!-- Zastosowanie: Krótkie wezwanie — format jednostronicowy       -->
<!-- Zmienne: NAZWA_WIERZYCIELA, NIP_WIERZYCIELA, ADRES_WIERZYCIELA, NAZWA_DLUZNIKA, ADRES_DLUZNIKA, MIEJSCOWOSC, DATA_WYSTAWIENIA, NUMER_FAKTURY, DATA_FAKTURY, KWOTA_NALEZNOSCI, WALUTA, TERMIN_ZAPLATY, KWOTA_ODSETEK_DO_DNIA, KWOTA_LACZNIE, NUMER_KONTA -->
<!-- ============================================================ -->

# WZÓR 3 — UPROSZCZONE WEZWANIE DO ZAPŁATY

**WEZWANIE DO ZAPŁATY**

Uproszczone — art. 455 KC

| **Wystawca:** | **{{NAZWA_WIERZYCIELA}}** / NIP: {{NIP_WIERZYCIELA}} |
|---|---|
| **Adres:** | {{ADRES_WIERZYCIELA}} |
| **Data:** | {{MIEJSCOWOSC}}, {{DATA_WYSTAWIENIA}} r. |

| **Adresat:** | **{{NAZWA_DLUZNIKA}}** |
|---|---|
| **Adres:** | {{ADRES_DLUZNIKA}} |

| Wzywamy do zapłaty kwoty **{{KWOTA_LACZNIE}} {{WALUTA}}** (należność główna: {{KWOTA_NALEZNOSCI}} {{WALUTA}} z faktury nr {{NUMER_FAKTURY}} z dnia {{DATA_FAKTURY}} r. + odsetki ustawowe za opóźnienie wg art. 481 KC: {{KWOTA_ODSETEK_DO_DNIA}} {{WALUTA}}). Termin zapłaty: **{{TERMIN_ZAPLATY}} dni** od doręczenia niniejszego pisma. |
|---|

Przelew na konto: **{{NUMER_KONTA}}** / odbiorca: **{{NAZWA_WIERZYCIELA}}**

Tytuł przelewu: **Zapłata faktury {{NUMER_FAKTURY}}**

Brak zapłaty w terminie spowoduje skierowanie sprawy na drogę sądową i obowiązek pokrycia kosztów postępowania.

| _____________________________ podpis osoby uprawnionej / pieczęć firmowa (opcjonalnie) |  |
|---|---|

> **Podstawa:** art. 455 KC, art. 481 KC. Odsetki 9,25% rocznie (od 5 marca 2026 r.). Wzór informacyjny, nie stanowi porady prawnej.

---

<!-- ============================================================ -->
<!-- KONIEC PLIKU: wzory_wezwan_do_zaplaty.md                     -->
<!-- Zawiera: Wzor1 (standardowe), Wzor2 (przedsądowe), Wzor3 (uproszczone) -->
<!-- ============================================================ -->
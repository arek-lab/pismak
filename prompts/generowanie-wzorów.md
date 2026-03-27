Używając web search, znajdź i zweryfikuj następujące informacje 
prawne aktualne na dziś w Polsce:

1. WEZWANIE DO ZAPŁATY
   - Aktualna wysokość odsetek ustawowych za opóźnienie (art. 481 KC) 
     — podaj % i datę ostatniej zmiany
   - Aktualna stopa referencyjna NBP
   - Czy art. 455 KC (wymagalność świadczenia) był nowelizowany 
     po 2023 roku?
   - Czy dla wezwania przedsądowego istnieje wymóg formalny 
     (forma pisemna, termin minimalny)?

2. ROZWIĄZANIE UMOWY ZA POROZUMIENIEM STRON
   - Art. 30 § 1 pkt 1 KP — czy obowiązuje bez zmian?
   - Czy porozumienie rozwiązujące musi mieć formę pisemną (art. 30 § 3 KP)?
   - Aktualny wymóg dot. pouczenia o prawie odwołania do sądu pracy
   - Czy pracownik zachowuje prawo do zasiłku przy rozwiązaniu 
     za porozumieniem — aktualne przepisy ZUS/ustawy o promocji zatrudnienia

3. ODPOWIEDŹ NA OPINIĘ GOOGLE
   - Czy odpowiedź na opinię podlega jakimś regulacjom prawnym w Polsce 
     (ustawa o zwalczaniu nieuczciwej konkurencji, RODO)?
   - Czy istnieją orzeczenia/wytyczne UOKiK dot. odpowiedzi na opinie online?

Dla każdego punktu podaj: aktualną wartość/stan, źródło (ustawa + artykuł 
lub URL), datę weryfikacji.
Jeśli czegoś nie możesz zweryfikować — napisz wprost zamiast zgadywać.



Na podstawie zweryfikowanych danych prawnych z poprzedniej sesji, 
stwórz 3 wzory wezwania do zapłaty dla polskiego MSP.

WYMAGANIA OGÓLNE:
- Język: formalny, profesjonalny, zrozumiały dla nieprawnika
- Ton: stanowczy ale nie agresywny
- Format: gotowy tekst z placeholderami w formacie {{NAZWA_ZMIENNEJ}}
- Każdy wzór kończy się miejscem na podpis

WZÓR 1 — Standardowe wezwanie do zapłaty
Pola wejściowe (placeholdery):
{{NAZWA_WIERZYCIELA}}, {{ADRES_WIERZYCIELA}}, {{NIP_WIERZYCIELA}}
{{NAZWA_DLUZNIKA}}, {{ADRES_DLUZNIKA}}
{{KWOTA_NALEZNOSCI}}, {{WALUTA}}
{{NUMER_FAKTURY}}, {{DATA_FAKTURY}}
{{TERMIN_ZAPLATY}} (ile dni od doręczenia)
{{DATA_WYSTAWIENIA}}, {{MIEJSCOWOSC}}

Treść musi zawierać:
- Podstawę prawną żądania (art. 455 KC)
- Dokładną kwotę z odsetkami ustawowymi za opóźnienie (art. 481 KC)
- Konkretny termin zapłaty
- Numer konta bankowego {{NUMER_KONTA}}
- Informację o konsekwencjach braku zapłaty (postępowanie sądowe)

WZÓR 2 — Wezwanie przedsądowe (ostateczne)
Dodatkowe pola:
{{DATA_POPRZEDNIEGO_WEZWANIA}}
{{KWOTA_ODSETEK_NALICZONYCH}}

Treść musi zawierać wszystko z wzoru 1 plus:
- Odniesienie do wcześniejszego wezwania
- Wzmiankę o skierowaniu sprawy do sądu i kosztach postępowania
- Możliwość ugody/rozłożenia na raty {{INFORMACJA_O_UGODZIE}} (opcjonalne pole)

WZÓR 3 — Wezwanie uproszczone (dla małych kwot, szybkie)
Pola: tylko niezbędne minimum
Styl: krótki, 1 strona maksymalnie

OUTPUT:
Dla każdego wzoru zwróć:
1. Pełny tekst pisma z placeholderami
2. Listę wszystkich placeholderów z opisem (co wpisać)
3. Notatkę prawną (1-2 zdania) — na co uważać przy tym wzorze
4. Sugerowany tytuł dokumentu (widoczny w UI)
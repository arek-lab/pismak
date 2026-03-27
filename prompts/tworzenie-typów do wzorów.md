Przeczytaj docs/wzory-opinie.md i przekształć je do struktury TypeScript gotowej do użycia w Next.js.

Dla każdego wzoru stwórz:

1. W lib/templates/[nazwa].ts:

export interface [Nazwa]Fields {
  // wszystkie placeholdery jako pola TypeScript
  // pola opcjonalne oznaczone '?'
}

export const [nazwa]Templates = {
  [templateId]: {
    id: string,
    label: string,           // nazwa w UI
    description: string,     // 1 zdanie opisu
    fields: FieldConfig[],   // konfiguracja formularza
    generate: (fields: [Nazwa]Fields) => string  // funkcja zwracająca tekst
  }
}

2. FieldConfig jako typ pomocniczy:
{
  key: string,
  label: string,       // etykieta w formularzu
  type: 'text' | 'date' | 'number' | 'textarea' | 'checkbox',
  placeholder?: string,
  required: boolean,
  helpText?: string    // podpowiedź pod polem
}

3. Zachowaj wszystkie teksty prawne dokładnie jak zostały 
   wygenerowane — nie parafrazuj, nie skracaj.

4. Dla pól wspólnych między wzorami tego samego generatora 
   (np. nazwa firmy) — oznacz komentarzem: // shared field
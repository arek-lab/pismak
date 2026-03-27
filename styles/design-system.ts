export const ds = {
  // Layout
  page: 'min-h-screen bg-[#F5F4F0]',
  container: 'max-w-3xl mx-auto px-4 py-8',

  // Karty
  card: 'bg-white rounded-2xl border border-[#E8E4DC] shadow-[0_2px_8px_rgba(0,0,0,0.04)]',
  cardPadded: 'bg-white rounded-2xl border border-[#E8E4DC] shadow-[0_2px_8px_rgba(0,0,0,0.04)] p-6',
  cardPaper: 'bg-[#FAFAF8] rounded-2xl border border-[#E8E4DC] shadow-[inset_0_1px_3px_rgba(0,0,0,0.04)]',

  // Formularze — styl "kartka papieru"
  formSection: 'space-y-5 p-6 bg-[#FAFAF8] rounded-xl',
  formSectionWierzyciel: 'space-y-5 p-6 bg-[#F4F8FF] rounded-xl',
  formSectionDluznik: 'space-y-5 p-6 bg-[#FFF9F4] rounded-xl',
  formSectionHeading: 'text-xs font-semibold uppercase tracking-wider text-[#6B6B6B] mb-2 mt-2',
  formStack: 'space-y-5 px-1 py-2',
  formGrid: 'grid grid-cols-1 md:grid-cols-2 gap-4',
  formSubmitBtn: 'bg-[#1B4332] text-white px-6 py-3 rounded-xl font-medium font-["DM_Sans"] hover:bg-[#145029] transition-colors shadow-sm w-full mt-6 block text-center',
  label: 'block text-xs font-medium text-[#6B6B6B] uppercase tracking-wider mb-1.5',
  input: 'w-full bg-white rounded-lg px-3 py-2 text-[#1A1A1A] font-["DM_Sans"] placeholder:text-[#A09890] focus:outline-none focus:ring-1 focus:ring-[#1B4332] transition-colors',
  textarea: 'w-full bg-white rounded-lg px-3 py-2 resize-none text-[#1A1A1A] placeholder:text-[#A09890] focus:outline-none focus:ring-1 focus:ring-[#1B4332] transition-colors',
  select: 'w-full bg-white rounded-lg px-3 py-2 text-[#1A1A1A] focus:outline-none focus:ring-1 focus:ring-[#1B4332] transition-colors',

  // Przyciski
  btnPrimary: 'bg-[#1B4332] text-white px-6 py-3 rounded-xl font-medium font-["DM_Sans"] hover:bg-[#145029] transition-colors shadow-sm',
  btnPrimarySmall: 'bg-[#1B4332] text-white px-5 py-2 rounded-xl font-medium font-["DM_Sans"] text-sm hover:bg-[#145029] transition-colors shadow-sm',
  btnSecondary: 'bg-white text-[#1A1A1A] px-6 py-3 rounded-xl font-medium border border-[#E8E4DC] hover:border-[#1B4332] transition-colors',
  btnGhost: 'text-[#6B6B6B] px-4 py-2 rounded-lg hover:bg-[#F5F4F0] transition-colors text-sm',

  // Tabs (switch wzorów)
  tabsWrapper: 'grid grid-cols-1 sm:grid-cols-3 gap-2 mb-6',
  tab: 'py-2 px-3 text-sm font-medium text-[#55aaff]/60 transition-all cursor-pointer text-center',
  tabActive: 'text-[#55aaff] font-semibold',

  // Podgląd dokumentu
  documentPreview: 'bg-white border border-[#E8E4DC] rounded-xl p-8 shadow-[0_4px_16px_rgba(0,0,0,0.06)] font-["DM_Mono"] text-sm leading-7 text-[#1A1A1A] mb-5',
  documentPreviewHeader: 'text-xs uppercase tracking-wider font-medium text-[#6B6B6B] mb-3',
  documentInner: 'text-[#1A1A1A] space-y-0.5',
  documentTitle: 'text-lg font-bold text-center mb-1 mt-2 tracking-wide uppercase',
  documentHeading: 'text-base font-bold mt-6 mb-2 border-b border-[#E8E4DC] pb-1',
  documentParagraph: 'text-sm leading-relaxed my-1',
  documentNote: 'text-xs text-[#6B6B6B] italic mt-4',
  documentWarning: 'bg-amber-50 border border-amber-200 rounded-lg text-sm my-3 py-2 px-3 text-amber-900',
  tableWrapper: 'w-full border-collapse text-sm my-3',
  tableHeaderRow: 'bg-[#F0EDE6]',
  tableHeaderCell: 'border border-[#E8E4DC] px-3 py-2 text-left font-semibold',
  tableCell: 'border border-[#E8E4DC] px-3 py-2',
  tableAltRow: 'bg-[#FAFAF8]',
  tableLabelCell: 'border border-[#E8E4DC] px-3 py-2 font-medium text-[#6B6B6B] w-1/3',

  // Nagłówki stron
  pageTitle: 'font-["Playfair_Display"] text-3xl font-bold text-[#1A1A1A] mb-2',
  pageLead: 'text-base text-[#6B6B6B] text-center mb-10 max-w-2xl font-["DM_Sans"]',

  // Navbar
  navbar: 'bg-white border-b border-[#E8E4DC] px-6 py-4 sticky top-0 z-50',
  navbarInner: 'flex items-center',
  navbarLogo: 'font-["Playfair_Display"] text-xl font-bold text-[#1A1A1A] tracking-tight',

  // Sekcja akcji dokumentu
  actionsRow: 'flex gap-5 justify-end items-center p-3',

  // Sekcja po generacji
  generatorOutput: 'mt-8 space-y-4',
  sectionDivider: 'text-xs uppercase tracking-wider text-[#6B6B6B] text-center my-2',

  // CTA Prywaciarz
  ctaBox: 'bg-gray-950 rounded-xl p-6 text-center',
  ctaBoxLabel: 'text-[#55aaff] text-xs font-medium tracking-widest uppercase mb-2',
  ctaBoxHeading: 'text-white font-bold text-lg leading-snug mb-2',
  ctaBoxBody: 'text-gray-400 text-sm mb-5',
  ctaBoxBtn: 'inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#55aaff] text-white font-semibold text-sm hover:bg-[#3d99ff] transition-colors shadow-lg shadow-[#55aaff]/25',
}

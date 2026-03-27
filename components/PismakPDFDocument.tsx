'use client'

import { Document, Font, Page, Text, View, StyleSheet } from '@react-pdf/renderer'

Font.register({
  family: 'Lato',
  fonts: [
    { src: '/fonts/Lato-Regular.ttf', fontWeight: 'normal', fontStyle: 'normal' },
    { src: '/fonts/Lato-Bold.ttf', fontWeight: 'bold', fontStyle: 'normal' },
    { src: '/fonts/Lato-Italic.ttf', fontWeight: 'normal', fontStyle: 'italic' },
    { src: '/fonts/Lato-BoldItalic.ttf', fontWeight: 'bold', fontStyle: 'italic' },
  ],
})

const styles = StyleSheet.create({
  page: {
    paddingTop: 50,
    paddingBottom: 65,
    paddingHorizontal: 50,
    fontSize: 10,
    fontFamily: 'Lato',
    lineHeight: 1.5,
    color: '#1a1a1a',
  },
  title: {
    fontSize: 13,
    fontFamily: 'Lato',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 9,
    fontFamily: 'Lato',
    textAlign: 'center',
    marginBottom: 12,
    color: '#555',
  },
  section: {
    fontSize: 10,
    fontFamily: 'Lato',
    fontWeight: 'bold',
    marginTop: 14,
    marginBottom: 6,
    borderBottom: '1px solid #ccc',
    paddingBottom: 2,
  },
  paragraph: {
    marginBottom: 6,
    lineHeight: 1.6,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottom: '1px solid #ddd',
  },
  tableCell: {
    flex: 1,
    padding: '4 6',
    fontSize: 9,
  },
  tableCellHeader: {
    flex: 1,
    padding: '4 6',
    fontSize: 9,
    fontFamily: 'Lato',
    fontWeight: 'bold',
    backgroundColor: '#f5f5f5',
  },
  tableCellLabel: {
    flex: 1,
    padding: '4 6',
    fontSize: 9,
    color: '#555',
  },
  warning: {
    backgroundColor: '#fff8e1',
    padding: '6 8',
    marginBottom: 8,
    fontSize: 9,
    borderLeft: '3px solid #f59e0b',
  },
  legalNote: {
    fontSize: 8,
    color: '#888',
    fontStyle: 'italic',
    marginTop: 10,
  },
  signature: {
    marginTop: 16,
    borderTop: '1px solid #999',
    paddingTop: 4,
    fontSize: 9,
    color: '#555',
  },
  footer: {
    position: 'absolute',
    bottom: 25,
    left: 50,
    right: 50,
    fontSize: 7.5,
    color: '#aaa',
    textAlign: 'center',
    borderTop: '1px solid #e5e5e5',
    paddingTop: 6,
  },
  spacer: {
    marginTop: 4,
  },
})

function stripBold(text: string): string {
  return text.replace(/\*\*(.*?)\*\*/g, '$1')
}

function stripEmoji(text: string): string {
  // Remove common emoji ranges using surrogate pairs (ES5-compatible)
  return text.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, '').replace(/[\u2600-\u27BF\uFE00-\uFEFF]/g, '').trim()
}

interface PdfLine {
  type: 'title' | 'subtitle' | 'section' | 'paragraph' | 'table' | 'warning' | 'legal' | 'signature' | 'blank'
  text?: string
  cells?: string[][]
}

function parseContent(content: string): PdfLine[] {
  const rawLines = content.split('\n')
  const result: PdfLine[] = []
  let i = 0

  while (i < rawLines.length) {
    const line = rawLines[i]

    // Collect consecutive table lines
    if (line.trimStart().startsWith('|')) {
      const tableLines: string[] = []
      while (i < rawLines.length && rawLines[i].trimStart().startsWith('|')) {
        tableLines.push(rawLines[i])
        i++
      }
      // Filter separator rows
      const dataLines = tableLines.filter((l) => !/^\|[\s\-:|]+\|/.test(l))
      if (dataLines.length > 0) {
        const cells = dataLines.map((l) =>
          l
            .split('|')
            .slice(1, -1)
            .map((c) => stripBold(stripEmoji(c.trim()))),
        )
        result.push({ type: 'table', cells })
      }
      continue
    }

    // Section heading
    if (/^#{2,}\s/.test(line)) {
      result.push({ type: 'section', text: stripBold(line.replace(/^#{2,}\s+/, '')) })
      i++
      continue
    }

    // Warning callout
    if (line.startsWith('> ⚠') || (line.startsWith('> ') && line.includes('WAŻNE'))) {
      result.push({ type: 'warning', text: stripBold(stripEmoji(line.replace(/^>\s*/, ''))) })
      i++
      continue
    }

    // Legal note
    if (line.startsWith('> ')) {
      result.push({ type: 'legal', text: stripBold(line.slice(2)) })
      i++
      continue
    }

    // Empty line
    if (line.trim() === '') {
      result.push({ type: 'blank' })
      i++
      continue
    }

    // Document title
    const titleMatch = line.match(/^\*\*([^*]+)\*\*$/)
    if (titleMatch) {
      result.push({ type: 'title', text: titleMatch[1] })
      i++
      continue
    }

    // Subtitle (first non-empty non-title line after a title)
    const lastNonBlank = result.filter((r) => r.type !== 'blank').at(-1)
    if (lastNonBlank?.type === 'title') {
      result.push({ type: 'subtitle', text: stripBold(line) })
      i++
      continue
    }

    // Paragraph
    result.push({ type: 'paragraph', text: stripBold(line) })
    i++
  }

  return result
}

interface Props {
  content: string
  pismoType?: string
}

export function PismakPDFDocument({ content, pismoType }: Props) {
  const lines = parseContent(content)

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {lines.map((line, idx) => {
          switch (line.type) {
            case 'title':
              return (
                <Text key={idx} style={styles.title}>
                  {line.text}
                </Text>
              )
            case 'subtitle':
              return (
                <Text key={idx} style={styles.subtitle}>
                  {line.text}
                </Text>
              )
            case 'section':
              return (
                <Text key={idx} style={styles.section}>
                  {line.text}
                </Text>
              )
            case 'paragraph':
              return (
                <Text key={idx} style={styles.paragraph}>
                  {line.text}
                </Text>
              )
            case 'warning':
              return (
                <View key={idx} style={styles.warning}>
                  <Text>{line.text}</Text>
                </View>
              )
            case 'legal':
              return (
                <Text key={idx} style={styles.legalNote}>
                  {line.text}
                </Text>
              )
            case 'table':
              return (
                <View key={idx} style={{ marginVertical: 4, borderTop: '1px solid #ddd' }}>
                  {(line.cells ?? []).map((cells, ri) => (
                    <View key={ri} style={styles.tableRow}>
                      {cells.map((cell, ci) => (
                        <Text
                          key={ci}
                          style={ri === 0 && (line.cells?.length ?? 0) > 2 ? styles.tableCellHeader : ci === 0 && cells.length === 2 ? styles.tableCellLabel : styles.tableCell}
                        >
                          {cell}
                        </Text>
                      ))}
                    </View>
                  ))}
                </View>
              )
            case 'blank':
              return <View key={idx} style={styles.spacer} />
            default:
              return null
          }
        })}

        <Text style={styles.footer} fixed>
          {`Wygenerowano bezpłatnie przez Pismak.pl \u2014 narz\u0119dzie od tw\u00f3rc\u00f3w Prywaciarza${pismoType ? ` \u2022 ${pismoType}` : ''}`}
        </Text>
      </Page>
    </Document>
  )
}

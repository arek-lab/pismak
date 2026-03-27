import React from 'react'
import { ds } from '@/styles/design-system'

interface DocumentOutputProps {
  content: string
}

function renderInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*.*?\*\*)/g)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
      return <strong key={i}>{part.slice(2, -2)}</strong>
    }
    return part || null
  })
}

function isSeparatorRow(line: string): boolean {
  return /^\|[\s\-:|]+\|/.test(line)
}

function TableBlock({ lines }: { lines: string[] }) {
  const dataLines = lines.filter((l) => !isSeparatorRow(l))
  if (dataLines.length === 0) return null

  const rows = dataLines.map((line) =>
    line
      .split('|')
      .slice(1, -1)
      .map((cell) => cell.trim()),
  )

  const isHeaderTable = rows.length > 2
  const [firstRow, ...bodyRows] = rows

  if (isHeaderTable) {
    return (
      <table className={ds.tableWrapper}>
        <thead>
          <tr className={ds.tableHeaderRow}>
            {firstRow.map((cell, ci) => (
              <th key={ci} className={ds.tableHeaderCell}>
                {renderInline(cell)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {bodyRows.map((cells, ri) => (
            <tr key={ri} className={ri % 2 === 1 ? ds.tableAltRow : ''}>
              {cells.map((cell, ci) => (
                <td key={ci} className={ds.tableCell}>
                  {renderInline(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    )
  }

  return (
    <table className={ds.tableWrapper}>
      <tbody>
        {rows.map((cells, ri) => (
          <tr key={ri}>
            {cells.map((cell, ci) => (
              <td key={ci} className={ci === 0 ? ds.tableLabelCell : ds.tableCell}>
                {renderInline(cell)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default function DocumentOutput({ content }: DocumentOutputProps) {
  const lines = content.split('\n')
  const elements: React.ReactNode[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    // Collect consecutive table lines
    if (line.trimStart().startsWith('|')) {
      const tableLines: string[] = []
      while (i < lines.length && lines[i].trimStart().startsWith('|')) {
        tableLines.push(lines[i])
        i++
      }
      elements.push(<TableBlock key={elements.length} lines={tableLines} />)
      continue
    }

    // Section heading ## or ###
    if (/^#{2,}\s/.test(line)) {
      const text = line.replace(/^#{2,}\s+/, '')
      elements.push(
        <h2 key={elements.length} className={ds.documentHeading}>
          {renderInline(text)}
        </h2>,
      )
      i++
      continue
    }

    // Warning callout (> ⚠ ...)
    if (line.startsWith('> ⚠') || line.startsWith('> ⚠')) {
      const text = line.replace(/^>\s*/, '')
      elements.push(
        <div key={elements.length} className={ds.documentWarning}>
          {renderInline(text)}
        </div>,
      )
      i++
      continue
    }

    // Blockquote / legal note
    if (line.startsWith('> ')) {
      const text = line.slice(2)
      elements.push(
        <p key={elements.length} className={ds.documentNote}>
          {renderInline(text)}
        </p>,
      )
      i++
      continue
    }

    // Empty line
    if (line.trim() === '') {
      i++
      continue
    }

    // Document title: line that is exactly **TITLE**
    const titleMatch = line.match(/^\*\*([^*]+)\*\*$/)
    if (titleMatch) {
      elements.push(
        <h1 key={elements.length} className={ds.documentTitle}>
          {titleMatch[1]}
        </h1>,
      )
      i++
      continue
    }

    // Regular paragraph
    elements.push(
      <p key={elements.length} className={ds.documentParagraph}>
        {renderInline(line)}
      </p>,
    )
    i++
  }

  return (
    <div>
      <p className={ds.documentPreviewHeader}>Podgląd pisma</p>
      <div id="document-output" className={ds.documentPreview}>
        <div className={ds.documentInner}>{elements}</div>
      </div>
    </div>
  )
}

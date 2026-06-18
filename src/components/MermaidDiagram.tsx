import mermaid from 'mermaid'
import { useEffect, useId, useRef, useState } from 'react'

// DOM에서 현재 테마 읽기 (useTheme.ts가 data-color-mode에 resolved 값을 쓴다)
function getCurrentMermaidTheme(): 'dark' | 'default' {
  const mode = document.documentElement.getAttribute('data-color-mode')
  return mode === 'dark' ? 'dark' : 'default'
}

interface Props {
  chart: string
}

export default function MermaidDiagram({ chart }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const uniqueId = useId().replace(/:/g, '')
  const [error, setError] = useState<string | null>(null)
  const [svg, setSvg] = useState<string | null>(null)
  const [currentTheme, setCurrentTheme] = useState(getCurrentMermaidTheme)

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setCurrentTheme(getCurrentMermaidTheme())
    })
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-color-mode'],
    })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: getCurrentMermaidTheme(),
      securityLevel: 'strict',
      fontFamily: 'inherit',
    })

    let cancelled = false
    let renderCount = 0

    async function render() {
      // mermaid.render가 같은 ID로 재호출되면 에러나므로 카운터 추가
      renderCount++
      const id = `mermaid_${uniqueId}_${renderCount}`
      try {
        const { svg: renderedSvg } = await mermaid.render(id, chart.trim())
        if (!cancelled) {
          setSvg(renderedSvg)
          setError(null)
        }
      } catch (err) {
        if (!cancelled) {
          // mermaid.render 실패 시 DOM에 남은 잔여 요소 정리
          const el = document.getElementById(id)
          if (el) el.remove()
          setError(err instanceof Error ? err.message : 'Mermaid render failed')
          setSvg(null)
        }
      }
    }

    render()
    return () => {
      cancelled = true
    }
  }, [chart, uniqueId, currentTheme])

  if (error) {
    return (
      <div className="mermaid-error">
        <pre>{error}</pre>
      </div>
    )
  }

  if (!svg) {
    return <div className="mermaid-loading">로딩 중...</div>
  }

  return <div ref={containerRef} className="mermaid-diagram" dangerouslySetInnerHTML={{ __html: svg }} />
}

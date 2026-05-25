import type { PortalDeliverable } from '@/lib/firebase/portal'

interface DeliverableEmbedProps {
  deliverable: PortalDeliverable
}

export default function DeliverableEmbed({ deliverable }: DeliverableEmbedProps) {
  const { type, embedUrl, label } = deliverable

  const sharedIframeClasses =
    'w-full h-full border-0 rounded-lg'

  return (
    <div className="w-full aspect-video bg-stone/10 rounded-lg overflow-hidden relative">
      {(type === 'figma' || type === 'video' || type === 'web-preview') && (
        <iframe
          src={embedUrl}
          title={label}
          className={sharedIframeClasses}
          allow="fullscreen"
          loading="lazy"
        />
      )}
      {type === 'pdf' && (
        <iframe
          src={`${embedUrl}#toolbar=1&navpanes=0`}
          title={label}
          className={sharedIframeClasses}
          loading="lazy"
        />
      )}
    </div>
  )
}

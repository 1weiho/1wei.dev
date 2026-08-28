interface YouTubeEmbedProps {
  id: string
  title?: string
}

const YouTubeEmbed = ({ id, title }: YouTubeEmbedProps) => {
  return (
    <div className="not-prose my-6 md:my-8 aspect-video overflow-hidden rounded-lg ring-1 ring-black/5">
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${id}`}
        title={title ?? 'YouTube video'}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="h-full w-full"
      />
    </div>
  )
}

export default YouTubeEmbed

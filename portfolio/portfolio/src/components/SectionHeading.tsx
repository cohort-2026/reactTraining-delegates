type SectionHeadingProps = {
  number: string
  title: string
}

function SectionHeading({ number, title }: SectionHeadingProps) {
  return (
    <div className="mb-10">
      <p className="font-mono text-sm text-red-600 dark:text-red-500">
        {number} /
      </p>
      <h2 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
        {title}
      </h2>
    </div>
  )
}

export default SectionHeading
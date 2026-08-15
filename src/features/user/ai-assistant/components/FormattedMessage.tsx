export default function FormattedMessage({ content }: { content: string }) {
    const lines = content.split("\n");

    return (
        <div className="leading-relaxed text-sm space-y-2">
            {lines.map((line, i) => {
                if (!line.trim()) return <br key={i} />;

                // Bold markers **text**
                const rendered = line.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\*(.+?)\*/g, "<em>$1</em>");

                if (line.startsWith("**") && line.endsWith("**")) {
                    return <p key={i} className="font-semibold" dangerouslySetInnerHTML={{ __html: rendered }} />;
                }
                return <p key={i} dangerouslySetInnerHTML={{ __html: rendered }} />;
            })}
        </div>
    );
}
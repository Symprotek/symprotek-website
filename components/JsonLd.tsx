/**
 * Renders a JSON-LD structured-data block.
 *
 * JSON.stringify already escapes quotes; the `<` replacement guards against a
 * "</script>" sequence inside any string value breaking out of the tag.
 */
export default function JsonLd({ data }: { data: object | object[] }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}

import type { Metadata } from "next";
import { PageHeader } from "./page-header";
import { Prose } from "./prose";

export function infoMetadata(title: string, description: string, path: string): Metadata {
  return { title, description, alternates: { canonical: path } };
}

export function InfoPage({
  title,
  description,
  draft = false,
  children,
}: {
  title: string;
  description: string;
  draft?: boolean;
  children: React.ReactNode;
}) {
  return (
    <>
      <PageHeader
        title={title}
        description={description}
        crumbs={[{ label: "Home", href: "/" }, { label: title }]}
      />
      <Prose draft={draft}>{children}</Prose>
    </>
  );
}

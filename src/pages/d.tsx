import React, {useEffect} from 'react';
import Head from '@docusaurus/Head';

export default function Doc(): React.ReactElement {
  useEffect(() => {
    window.location.replace('/doc/documents/manual.html');
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-900 px-6 text-center text-white">
      <Head>
        <meta httpEquiv="refresh" content="0; url=/doc/documents/manual.html" />
        <meta name="robots" content="noindex" />
        <link rel="canonical" href="https://voxelplayground.com/doc/documents/manual.html" />
      </Head>
      <div>
        <div className="text-lg font-semibold">Redirecting to docs...</div>
        <a className="mt-3 block text-sm text-sky-400 underline" href="/doc/documents/manual.html">
          Open docs
        </a>
      </div>
    </main>
  );
}

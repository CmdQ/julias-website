import { visit } from 'unist-util-visit';

export function remarkLightboxGallery() {
  return (tree) => {
    visit(tree, 'html', (node) => {
      if (node.value.includes('class="photo-gallery-full"')) {
        // Simple regex to find img tags.
        // Note: This assumes standard formatting as seen in the user's file.
        // It captures src and alt.
        const imgRegex = /<img\s+src="([^"]+)"\s+alt="([^"]+)"\s*\/?>/g;

        node.value = node.value.replace(imgRegex, (match, src, alt) => {
          // Generate a unique ID based on the filename
          const filename = src.split('/').pop().split('.')[0];
          const id = `lb-${filename}`;

          return `
  <a href="#${id}">
    <img src="${src}" alt="${alt}">
  </a>
  <a href="#_" id="${id}" class="lightbox">
    <img src="${src}" alt="${alt}">
  </a>`;
        });
      }
    });
  };
}

const API_URL = import.meta.env.WORDPRESS_GRAPHQL_URL;

async function fetchAPI(query: any, { variables }: any = {}) {
  const headers = { "Content-Type": "application/json" };
  const res = await fetch(API_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({ query, variables }),
  });

  const json = await res.json();
  if (json.errors) {
    console.log(json.errors);
    throw new Error("Failed to fetch API");
  }

  return json.data;
}

export async function getAllPagesWithSlugs() {
  const data = await fetchAPI(`
  {
    pages(first: 10000) {
      edges {
        node {
          slug
        }
      }
    }
  }
  `);
  return data?.pages;
}

export async function getAllPostsWithSlugs() {
  const data = await fetchAPI(`
{
  posts (first: 10000) {
    nodes {
      slug
    }
  }
}
  `);
  return data?.posts;
}

export async function getPostBySlug(slug: any) {
  const data = await fetchAPI(`
  {
    postBy(slug: "${slug}") {
    content
    title
  }
  }
  `);
  return data?.postBy;
}

export async function getPageBySlug(slug: any) {
  const data = await fetchAPI(`
  {
    page(id: "${slug}", idType: URI) {
      title
      content
    }
  }
  `);
  return data?.page;
}

export async function getAllPostsBasic() {
  const data = await fetchAPI(`
      {
        posts (first: 10000) {
          nodes {
            id
            slug
            title
            uri
            date
            categories {
              nodes {
                name
              }
            }
            featuredImage {
              node {
                mediaItemUrl
              }
            }
          }
        }
      }
  `);
  return data;
}

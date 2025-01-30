// types/ai-content.ts
export type AIContent = {
    slug: string
    title: string
    description: string
    posts?: Post[]
    content?: string
    date?: Date
    image?: string
  }
  
  export type Post = {
    slug: string
    title: string
    description: string
    content: string
    date?: Date
  }

  
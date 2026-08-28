import { defineCollection } from 'astro:content';
import { z } from 'astro:schema';
import { glob } from 'astro/loaders';

const reviewsCollection = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: "./src/content/reviews" }),
  schema: ({ image }) => z.object({
    // 基本信息
    name: z.string(),
    featured: z.boolean().default(false),
    affiliateLink: z.string().url(),
    coupon: z.string().optional(),
    couponDesc: z.string().optional(),
    dongSays: z.string(), // 懂说：一句话锐评，有态度、不打官腔
    protocol: z.string().optional(), // 该品牌套餐页面实际标注的协议名称，没写就留空，不要用通用占位符

    // 评测结构化数据
    rating: z.object({
      speed: z.number().min(0).max(5),
      stability: z.number().min(0).max(5),
      value: z.number().min(0).max(5),
      support: z.number().min(0).max(5),
      overall: z.number().min(0).max(5),
    }),
    summary: z.string(),
    pros: z.array(z.string()),
    cons: z.array(z.string()),
    targetAudience: z.array(z.string()),
    scenes: z.array(z.enum([
      'stable', 'budget', 'heavy-traffic', 'ai-power', 'streaming-hq', 'beginner', 'balanced'
    ])).default([]),

    featuredNote: z.string().optional(),

    // 套餐信息 (optional for now, as images/details are pending)
    pricing: z.array(z.object({
      name: z.string(),
      price: z.number(), // updated to number
      billingCycle: z.enum(['monthly', 'quarterly', 'yearly', 'onetime']),
      period: z.string().optional(), // kept for backward compatibility during migration
      isLimited: z.boolean().default(false),
      refundable: z.boolean().default(false),
    })).optional(),

    // 测速数据 (optional for now)
    speedTests: z.array(z.object({
      region: z.string(),
      nodeCount: z.number(),
      avgLatencyMs: z.number(),
      avgSpeedMbps: z.number(),
      maxSpeedMbps: z.number().optional(),
      testDate: z.date(),
      note: z.string().optional()
    })).optional(),

    // FAQ
    faq: z.array(z.object({
      question: z.string(),
      answer: z.string(),
    })).default([]),

    // SEO 字段
    metaTitle: z.string(),
    metaDescription: z.string(),
    focusKeyword: z.string(),
    updatedDate: z.date(),
  })
});

const blogCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: "./src/content/blog" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    coverImage: image().optional(),
    publishDate: z.date(),
    updatedDate: z.date().optional(),
    keywords: z.array(z.string()),
    relatedBrands: z.array(z.string()).optional(),
    articleType: z.enum(['roundup', 'deep-dive', 'guide']),
    pinned: z.boolean().default(false),
    draft: z.boolean().default(false),
  })
});

export const collections = {
  'reviews': reviewsCollection,
  'blog': blogCollection,
};

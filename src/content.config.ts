import { defineCollection } from 'astro:content';
import { z } from 'astro:schema';
import { glob } from 'astro/loaders';

const reviewsCollection = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: "./src/content/reviews" }),
  schema: ({ image }) => z.object({
    // 基本信息
    name: z.string(),
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

    // 套餐信息 (optional for now, as images/details are pending)
    pricing: z.array(z.object({
      name: z.string(),
      price: z.string(), // e.g., "￥15.00"
      period: z.string(), // e.g., "月付", "年付"
      isLimited: z.boolean().default(false),
      refundable: z.boolean().default(false),
    })).optional(),

    // 测速数据 (optional for now)
    speedTests: z.array(z.object({
      region: z.string(), // e.g., "广东移动"
      image: image().optional(), // using Astro's built-in image helper
      date: z.date(),
      conclusion: z.string(),
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

export const collections = {
  'reviews': reviewsCollection,
};

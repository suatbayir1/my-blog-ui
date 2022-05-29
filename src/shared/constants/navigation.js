// Libraries
import { IconFont } from '@influxdata/clockface'

export const hierarchy = [
    {
        id: 'category',
        icon: IconFont.Layers,
        label: 'Category',
        link: {
            type: 'link',
            location: `/admin/category`,
        },
        activeKeywords: ['category'],
        permitted: ['user', 'admin'],
    },
    {
        id: 'posts',
        icon: IconFont.TextBlock,
        label: 'Posts',
        link: {
            type: 'link',
            location: `/admin/posts`,
        },
        activeKeywords: ['posts', 'post'],
        permitted: ['user', 'admin'],
    },
]
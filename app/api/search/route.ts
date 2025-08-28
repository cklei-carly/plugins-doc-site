import { source } from '@/lib/source';
import { createSearchAPI, type Index, type SimpleOptions } from 'fumadocs-core/search/server';

export const { GET } = createSearchAPI('simple', {
    language: 'english',
    indexes: source.getPages().map((page) => {
        const prefixTitle = page.data.repository ? page.data.repository.displayName ?? page.data.repository.repo : '';
        const suffixTitle = page.data.version ? page.data.version.version : '';
        const title = [prefixTitle, page.data.title, suffixTitle].filter(Boolean).join(' - ');
        return {
            title: title,
            description: page.data.repository?.description ?? '',
            url: page.url,
            content: title,
        };
    }),
});
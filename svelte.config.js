import sveltePreprocess from 'svelte-preprocess';

export default {
	preprocess: sveltePreprocess({
		postCss: true,
	}),
};

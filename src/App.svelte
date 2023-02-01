<script lang="ts">
	/* ----------  Imports  ---------- */

	// Lodash
	import { map } from 'lodash';

	// Yup
	import * as yup from 'yup';

	// Snackbar
	import Snackbar from 'awesome-snackbar';

	// Copy To Clipboard
	import copy from 'copy-to-clipboard';

	// Data
	import codes from './data/PhoneCountryCodes';

	/* ----------  Scripts  ---------- */

	let formData = {
		phone: '',
		code: localStorage.getItem('phoneCode') || '+91',
	}

	const validatorSchema = yup.object({
		phone: yup.string().matches(new RegExp('[0-9]{10}')),
	});

	const phoneCodes = map(codes, code => ({ text: code.name, value: code.dial_code }));

	const onCopyToClipboardClick = async () => {
		try {
			const url = await generateLink();
			copy(url);

			Snackbar('Link copied to clipboard!', {
				position: 'top-center',
				style: {
					container: [
						['background-color', '#9333ea'],
						['border-radius', '5px']
					],
					message: [
						['font-family', 'Poppins']
					]
				}
			});
		} catch (err) {
			console.log(err);
		}
	}

	const submitForm = async () => {
		try {
			const url = await generateLink();
			window.open(url, '_blank');

			localStorage.setItem('phoneCode', formData.code);

			formData.phone = '';
		} catch (err) {
			console.log(err);
		}
	}

	const generateLink = async () => {
		try {
			const isValid = await validatorSchema.isValid(formData);

			if(!isValid) {
				Snackbar('Please enter a valid phone number!', {
					position: 'top-center',
					style: {
						container: [
							['background-color', '#E94A35'],
							['border-radius', '5px']
						],
						message: [
							['font-family', 'Poppins']
						]
					}
				});

				throw new Error('Invalid data entered!');
			}

			const url = `https://wa.me/${ formData.code }${ formData.phone }`;
			localStorage.setItem('phoneCode', formData.code);

			return url;
		} catch (err) {
			throw err;
		}
	}
</script>

<div class="bg-slate-900 text-white flex flex-col items-center justify-center">
	<div class="hidden">
		<div class="bg-red-500"></div>
	</div>
	<div class="container px-7 h-screen flex flex-col">
		<div class="app-content flex-1 flex flex-col justify-center w-full max-w-none sm:max-w-xl mx-auto">
			<header class="app-header text-center py-8 lg:py-10">
				<h1 class="text-3xl md:text-5xl font-bold">WhatsApp Nosave</h1>
			</header>
			<main class="app-form">
				<form class="mb-4" on:submit|preventDefault={ submitForm }>
					<div class="form-group select-form-group mb-4 relative">
						<select
							bind:value={ formData.code }
							class="appearance-none border-2 border-purple-900 block py-4 px-6 w-full text-lg rounded-lg placeholder-gray-400 text-white bg-transparent outline-none duration-300 ease-in-out ring-0 focus:border-purple-600 hover:border-purple-600 cursor-pointer">
							{ #each phoneCodes as code }
								<option value={ code.value } class="text-slate-900">{ code.text } ({ code.value })</option>
							{ /each }
						</select>
						<span class="material-icons absolute top-2/4 right-5 -translate-y-1/2">expand_more</span>
					</div>
					<div class="flex flex-col">
						<div class="form-group flex-1 mb-4">
							<!-- svelte-ignore a11y-autofocus -->
							<input
								type="tel"
								placeholder="Phone Number"
								bind:value={ formData.phone }
								autofocus
								class="appearance-none border-2 border-purple-900 block py-4 px-6 w-full text-lg rounded-lg placeholder-gray-400 text-white bg-transparent outline-none duration-300 ease-in-out ring-0 focus:border-purple-600"
							/>
						</div>
						<div class="form-actions flex flex-row gap-4">
							<button type="submit" class="flex-1 border-2 text-lg w-full tracking-wide border-transparent bg-purple-600 text-white rounded-md py-4 pb-3 px-6 transition duration-300 ease-in-out select-none hover:bg-purple-700 focus:outline-none focus:shadow-none sm:w-auto">
								Open WhatsApp
							</button>
							<button
								type="button"
								class="flex-1 border-2 text-lg w-full tracking-wide border-purple-500 text-purple-500 rounded-md py-4 pb-3 px-6 transition duration-300 ease-in-out select-none hover:bg-purple-500 hover:text-white focus:outline-none focus:shadow-none sm:w-auto"
								on:click={ onCopyToClipboardClick }>
								Copy Link
							</button>
						</div>
					</div>
				</form>
				<p class="text-slate-500 text-center sm:text-left">No data is being saved or used in any way.</p>
			</main>
		</div>
		<footer class="app-footer py-6 lg:py-8">
			<div class="flex flex-col sm:flex-row justify-center sm:justify-between items-center">
				<div class="copyright-container sm:mb-0 mb-4">
					<a href="https://websorcier.com" target="_blank" class="text-gray-300">Developed by <strong>Web Sorcier</strong></a>
				</div>
				<div class="contact-container">
					<ul class="contact-list flex items-center gap-3">
						<li><a href="mailto:hello@websorcier.com" target="_blank">Email</a></li>
						<li><a href="https://twitter.com/websorcier/" target="_blank">Twitter</a></li>
						<li><a href="https://www.instagram.com/websorcier/" target="_blank">Instagram</a></li>
						<li><a href="https://in.linkedin.com/in/azizk49/" target="_blank">LinkedIn</a></li>
					</ul>
				</div>
			</div>
		</footer>

		<a href="https://github.com/websorcier/miniapps-whatsapp-nosave" class="github-corner astro-J7PV25F6" aria-label="View source on GitHub" target="_blank">
			<svg width="80" height="80" viewBox="0 0 250 250" style="fill:#fff; color:#00172A; position: absolute; top: 0; border: 0; right: 0;" aria-hidden="true" class="astro-J7PV25F6">
				<path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z" class="astro-J7PV25F6"></path>
				<path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" style="transform-origin: 130px 106px;" class="octo-arm astro-J7PV25F6"></path>
				<path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" class="octo-body astro-J7PV25F6"></path>
			</svg>
		</a>

	</div>
</div>

<script lang="ts">
	/* ----------  Imports  ---------- */

	// Lodash
	import { isEmpty } from 'lodash';

	// Yup
	import * as yup from 'yup';

	// Snackbar
	import Snackbar from 'awesome-snackbar';

	/* ----------  Scripts  ---------- */

	let formData = {
		phone: '+91',
	}

	const validatorSchema = yup.object({
		phone: yup.string().matches(new RegExp('[0-9]{12}')),
	});

	const submitForm = async () => {
		try {
			const isValid = await validatorSchema.isValid(formData);
			console.log(isValid);

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

				return;
			}

			const url = `https://wa.me/${ formData.phone }`;
			window.open(url, '_blank');

			formData.phone = '+91';
		} catch (err) {
			console.log(err);
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
				<form class="flex flex-col sm:flex-row sm:items-center mb-4" on:submit|preventDefault={ submitForm }>
					<div class="form-group flex-1 mb-4 sm:mr-4 sm:mb-0">
						<input
							type="tel"
							placeholder="Phone (with country code)"
							bind:value={ formData.phone }
							autofocus
							class="appearance-none block py-4 px-6 w-full text-lg rounded-lg bg-slate-700 placeholder-gray-400 text-white bg-transparent outline-none ring-0 border-0"
						/>
					</div>
					<div class="form-actions">
						<button
							class="border-0 text-lg w-full tracking-wide bg-indigo-500 text-white rounded-md py-4 px-6 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-none sm:w-auto"
							disabled={ isEmpty(formData.phone) }>
							Open WhatsApp
						</button>
					</div>
				</form>
				<p class="text-slate-500 text-center sm:text-left">No data is being saved or used in any way.</p>
			</main>
		</div>
		<footer class="app-footer py-6 lg:py-8">
			<div class="flex flex-col sm:flex-row justify-center sm:justify-between items-center">
				<div class="copyright-container sm:mb-0 mb-4">
					<p class="text-gray-300">&copy; Web Sorcier { new Date().getFullYear() }</p>
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

	</div>
</div>

<style>

</style>

<script lang="ts">
	import { Card } from 'flowbite-svelte';
</script>

<Card class="opacity-75">
	<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
		<slot name="title">Noteworthy technology acquisitions 2021</slot>
	</h5>
	<p class="font-normal leading-tight text-gray-700 dark:text-gray-400">
		<slot name="data">
			Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse
			chronological order.
		</slot>
	</p>
</Card>

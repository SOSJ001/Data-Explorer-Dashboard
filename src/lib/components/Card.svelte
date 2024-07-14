<script lang="ts">
	import { Card } from 'flowbite-svelte';
</script>

<Card class="opacity-75">
	<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
		<slot name="title">Noteworthy technology acquisitions 2021</slot>
	</h5>
	<div
		class=" h-full font-normal leading-tight text-gray-700 dark:text-gray-400"
	>
		<span class="flex flex-col h-full justify-center gap-y-3">
			<span><slot name="data">Here</slot></span>
		</span>
	</div>
</Card>

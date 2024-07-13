<script>
  import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
</script>
<div class="w-screen">
<Navbar class="bg-opacity-0 text-white border-b"  >
  <NavBrand href="/">
    <!-- <img src="" class="me-3 h-6 sm:h-9" alt="Flowbite Logo" /> -->
    <span class="self-center whitespace-nowrap text-xl font-semibold">Explorer</span>
  </NavBrand>
  <!-- <NavHamburger  /> -->
  <div class="flex flex-row gap-3 h-full justify-center items-center text-lg font-mono font-bold">
    <span>Cluster -></span>
    <span class="text-white"><slot name="clusterDrawer">Cluster</slot></span>
  </div>
</Navbar>
</div>

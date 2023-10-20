<script>
    import { Link } from "svelte-routing";
    export let title = "";
    import { sessionUser, isLoading } from "../stores";
</script>

<div class="navbar bg-base-100 mb-8 {$isLoading ? 'loading-border' : ''}">
    <div class="flex-none">
        <label for="nav-drawer-control" class="btn btn-square btn-ghost">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="inline-block w-5 h-5 stroke-current"
                ><path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16"
                /></svg
            >
        </label>
    </div>
    <div class="flex-1">
        <div class="btn btn-ghost normal-case text-xl">
            <Link to="/">{title}</Link>
        </div>
    </div>

    <div class="flex-none">
        
        <Link to={`/user/${$sessionUser?.email}`}>
            <div class="btn btn-ghost btn-circle avatar">
                <div
                    class="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-1"
                >
                    <img alt="The user" src={$sessionUser?.profile.imageUrl} />
                </div>
            </div>
        </Link>
    </div>
</div>

<style>
    @keyframes loading {
        0% {
            border-bottom-color: transparent;
        }
        35% {
            border-bottom-color: hsl(var(--p));
        }
        50% {
            border-bottom-color: hsl(var(--pf));
        }
        65% {
            border-bottom-color: hsl(var(--p));
        }
        100% {
            border-bottom-color: transparent;
        }
    }

    .loading-border {
        border-bottom: 2px solid transparent; 
        animation: loading 1s linear infinite;
    }
</style>

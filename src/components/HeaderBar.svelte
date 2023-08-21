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
        <ul class="menu bg-base-200 lg:menu-horizontal rounded-box">
            <li>
                <div>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        ><path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                        /></svg
                    >
                    Inbox
                    <span class="badge badge-sm">99+</span>
                </div>
            </li>
            <li>
                <div>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        ><path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        /></svg
                    >
                    Updates
                    <span class="badge badge-sm badge-warning">NEW</span>
                </div>
            </li>
            <li>
                <div>
                    Stats
                    <span class="badge badge-xs badge-info" />
                </div>
            </li>
        </ul>
        <Link to={`/user/${$sessionUser?.email}`}>
            <label tabindex="0" class="btn btn-ghost btn-circle avatar">
                <div
                    class="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-1"
                >
                    <img src={$sessionUser?.profileImgUrl} />
                </div>
            </label>
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

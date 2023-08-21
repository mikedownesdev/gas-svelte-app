<script>
    import { Link } from "svelte-routing";
</script>

<div class="flex flex-col items-center justify-center py-20">
    <div class="text-[hsl(var(--er))]">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            class="w-10 h-10"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
        </svg>
    </div>
    <div class="pt-2 pb-2">
        <p>
            The page you've requested either does not exist or you do not have
            access to it.
        </p>
    </div>
    <div class="py-4">
        <h2>
            <Link to="/"><span class="link">Go back to Home page</span></Link>
        </h2>
    </div>
</div>

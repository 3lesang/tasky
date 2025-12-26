import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/app/get-query-client";
import { pokemonOptions } from "./task";
import { PokemonInfo } from "./task-info";

export default function Home() {
	const queryClient = getQueryClient();

	void queryClient.prefetchQuery(pokemonOptions);

	return (
		<main>
			<h1>Pokemon Info</h1>
			<HydrationBoundary state={dehydrate(queryClient)}>
				<PokemonInfo />
			</HydrationBoundary>
		</main>
	);
}

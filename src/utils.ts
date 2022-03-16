/**
 * Return a random integer between zero and max (exclusive)
 * @param max - The upper bounds for the random number
 */
export function randint(max: number) {
	return Math.floor(Math.random() * max);
}
import { redirect } from '@sveltejs/kit'
import Client from 'twitter-api-sdk'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) throw redirect(302, '/')

	const client = new Client(locals.user.access_token)

	try {
		const tweets = await client.tweets.usersIdTimeline(locals.user.twitter_id, {
			// max_results: 30,
			expansions: ['author_id'],
			'tweet.fields': ['created_at'],
			'user.fields': ['profile_image_url'],
			// 'tweet.fields': ['author_id'],
			// 'tweet.fields': ['created_at', 'entities', 'public_metrics'],
		})

		console.log(tweets)

		console.log(tweets.includes?.users)

	 return {
		tweets
	 }
	}
	catch (error) {
		throw redirect(302, '/sign_out')
	}
}
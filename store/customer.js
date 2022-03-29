import {
  INSERT_REQUEST,
  FETCH_REQUEST_BY_EMAIL,
} from '@/graphql/gql/customer/types'
import { hasura, email } from '@/axios'

export const actions = {
  async insertCustomerRequest({ commit }, data) {
    const result = await hasura({
      data: {
        query: INSERT_REQUEST(data),
      },
    })
    if (result.insert_customer_requests_one.id) {
      return result.insert_customer_requests_one.id
    } else {
      throw new Error("Can't insert message to DB")
    }
  },

  async sendCustomerRequestToMail({ commit }, data) {
    const result = await email({
      data: JSON.stringify(data),
    })

    return result
  },

  async fetchCustomerRequestByEamil({ commit }, data) {
    const result = await hasura({
      data: {
        query: FETCH_REQUEST_BY_EMAIL(data),
      },
    })

    if (result.customer_requests.length > 0) {
      return result.customer_requests[0]
    } else {
      return null
    }
  },
}

export const mutations = {}

export const state = () => ({})

export const getters = {}

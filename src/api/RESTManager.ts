import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { Node } from "./Node";
import { EventEmitter } from "events";

/**
 * Handles REST requests to an andesite node.
 * @extends {EventEmitter}
 */
export class RESTManager extends EventEmitter {
  /**
   * The amount of requests for session (node connection, goes back to 0 on reconnect).
   */
  public requests: number = 0;
  /**
   * The axios instance used for requests.
   * @private
   */
  private axios: AxiosInstance;
  public constructor(node: Node) {
    super();

    this.axios = axios.create({
      baseURL: `http://${node.host}:${node.port}`,
      headers: { "User-Id": node.manager.userId },
      timeout: node.manager.restTimeout || 20000
    });

    if (node["auth"] !== undefined)
      this.axios.defaults.headers.common.Authorization = node["auth"];
  }

  /**
   * Makes a get request to the node.
   * @param {string} endpoint - The endpoint to make a request to.
   * @param {AxiosRequestConfig} [config] - Config to use for the request.
   */
  public get(endpoint: string, config?: AxiosRequestConfig): Promise<any> {
    return new Promise((resolve, reject) => {
      return this.axios
        .get(endpoint, config)
        .then((res: AxiosResponse) => {
          this.requests++;
          return resolve(res.data);
        })
        .catch(reject);
    });
  }

  /**
   * Makes a POST request to the node
   * @param {string} endpoint - The endpoint to make a request to.
   * @param {*} data - The data to post.
   * @param {AxiosRequestConfig} [config] - Config to use for the request.
   */
  public post(
    endpoint: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      return this.axios
        .post(endpoint, data, config)
        .then((res: AxiosResponse) => {
          this.requests++;
          return resolve(res.data);
        })
        .catch(reject);
    });
  }

  /**
   * Makes a PATCH request to the node.
   * @param {string} endpoint - The endpoint to make a request to.
   * @param {any} data - The data to patch.
   * @param {AxiosRequestConfig} [config] - Config to use for the request.
   */
  public patch(
    endpoint: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      return this.axios
        .patch(endpoint, data, config)
        .then((res: AxiosResponse) => {
          this.requests++;
          return resolve(res.data);
        })
        .catch(reject);
    });
  }

  /**
   * Makes a DELETE request to the node.
   * @param {string} endpoint - The endpoint to make a request to.
   * @param {AxiosRequestConfig} [config] - Config to use for the request.
   */
  public delete(endpoint: string, config?: AxiosRequestConfig): Promise<any> {
    return new Promise((resolve, reject) => {
      return this.axios
        .delete(endpoint, config)
        .then((res: AxiosResponse) => {
          this.requests++;
          return resolve(res.data);
        })
        .catch(reject);
    });
  }
}

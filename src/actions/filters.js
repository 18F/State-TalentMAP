import axios from 'axios';
import api from '../api';
import { ASYNC_PARAMS, ENDPOINT_PARAMS } from '../Constants/EndpointParams';
import { removeDuplicates } from '../utilities';

export function filtersHasErrored(bool) {
  return {
    type: 'FILTERS_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function filtersIsLoading(bool) {
  return {
    type: 'FILTERS_IS_LOADING',
    isLoading: bool,
  };
}
export function filtersFetchDataSuccess(filters) {
  return {
    type: 'FILTERS_FETCH_DATA_SUCCESS',
    filters,
  };
}

export function filtersFetchData(items, queryParams, savedResponses) {
  return (dispatch) => {
    dispatch(filtersIsLoading(true));
    dispatch(filtersHasErrored(false));

    const queryParamObject = queryParams;

    // "mappedParams" allow us to map filters to query params.
    // Since query params come in with no "extra" data, we have
    // to map them back to the original filters from the API
    // in order to supplement them with human-readable data.
    // "filters" will store our selectable filters.
    const responses = savedResponses
      || {
        mappedParams: [],
        asyncParams: [],
        filters: [],
        hasFetched: false,
        asyncFilterCache: [],
      };

    // Map our props that are retrieved on the fly and don't have
    // anything to reference against (posts and missions).
    // We could easily check the originating param (selectionRef)
    // and perform any custom, conditional labeling.
    // TODO we should verify these against VALID_PARAMS.
    function mapAsyncParams() {
      const asyncFilters = responses.asyncParams;

      const asyncQueryProms = asyncFilters.map((item) => {
        let cacheFound = false;
        responses.asyncFilterCache.forEach((a) => {
          if (a.codeRef === item.codeRef) {
            cacheFound = a;
          }
        });
        if (cacheFound) {
          return cacheFound;
        } else if (item.selectionRef === ENDPOINT_PARAMS.post) {
          return axios.get(`${api}/orgpost/${item.codeRef}/`)
          .then((response) => {
            const obj = Object.assign(response.data, { type: 'post', codeRef: item.codeRef });
            let found = false;
            responses.asyncFilterCache.forEach((a) => {
              if (a.codeRef === item.codeRef) {
                found = true;
              }
            });
            if (!found) {
              responses.asyncFilterCache.push(obj);
            }
            return obj;
          });
        }
        if (item.selectionRef === ENDPOINT_PARAMS.mission) {
          return axios.get(`${api}/country/${item.codeRef}/`)
          .then((response) => {
            const obj = Object.assign(response.data, { type: 'mission', codeRef: item.codeRef });
            let found = false;
            responses.asyncFilterCache.forEach((a) => {
              if (a.codeRef === item.codeRef) {
                found = true;
              }
            });
            if (!found) {
              responses.asyncFilterCache.push(obj);
            }
            return obj;
          });
        }
        return {};
      });

      const asyncData = [];

      Promise.all(asyncQueryProms)
        // Promise.all returns a single array which matches the order of the originating array
        .then((results) => {
          results.forEach((result) => {
            asyncData.push(result);
          });
        })
        .then(() => {
          asyncFilters.forEach((item, i) => {
            asyncData.forEach((data) => {
              if (item.codeRef === data.codeRef) {
                if (data.type === 'post') {
                  asyncFilters[i].description = `${data.location} (Post)`;
                } else if (data.type === 'mission') {
                  asyncFilters[i].description = `${data.short_name} (Mission)`;
                } else {
                  asyncFilters[i].description = '';
                }
              }
            });
          });
          responses.mappedParams.push(...responses.asyncParams);
          responses.mappedParams = removeDuplicates(responses.mappedParams, 'description');
          // finally, dispatch a success
          dispatch(filtersHasErrored(false));
          dispatch(filtersIsLoading(false));
          dispatch(filtersFetchDataSuccess(responses));
        })
        .catch(() => {
          dispatch(filtersHasErrored(true));
          dispatch(filtersIsLoading(false));
        });
    }

    function dispatchSuccess() {
      // Set all of our isSelected values back to false.
      // We'll check if they should be set to true later
      responses.filters.forEach((responseFilter, i) => {
        responseFilter.data.forEach((responseFilterData, j) => {
          responses.filters[i].data[j].isSelected = false;
        });
      });
      // check for option queryParamObject to map against (used for pill filters)
      responses.mappedParams = [];
      responses.asyncParams = [];

      // set any custom descriptions
      responses.filters.forEach((filterItem, i) => {
        filterItem.data.forEach((filterItemObject, j) => {
          if (filterItem.item.description === 'region') {
            responses.filters[i].data[j].custom_description =
              `${filterItemObject.long_description}
              (${filterItemObject.short_description})`;
          } else if (filterItem.item.description === 'skill') {
            responses.filters[i].data[j].custom_description =
              `${filterItemObject.description}
              (${filterItemObject.code})`;
          } else if (filterItem.item.description === 'post') {
            responses.filters[i].data[j].custom_description =
              filterItemObject.location;
          }
        });
      });

      // map any query params
      if (queryParamObject) {
        responses.filters.forEach((response) => {
          const filterRef = response.item.selectionRef;
          Object.keys(queryParamObject).forEach((key) => {
            if (key === filterRef) {
              // convert the string to an array
              const paramArray = queryParamObject[key].split(',');
              paramArray.forEach((paramArrayItem) => {
                // create a base config object
                const mappedObject = {
                  selectionRef: filterRef,
                  codeRef: paramArrayItem,
                };
                responses.filters.forEach((filterItem, i) => {
                  filterItem.data.forEach((filterItemObject, j) => {
                    if (
                      (filterItemObject.code &&
                          filterItemObject.code.toString() === mappedObject.codeRef.toString() &&
                          filterItem.item.selectionRef === mappedObject.selectionRef) ||
                      (filterItemObject.id &&
                          filterItemObject.id.toString() === mappedObject.codeRef.toString() &&
                          filterItem.item.selectionRef === mappedObject.selectionRef)
                        ) {
                      responses.filters[i].data[j].isSelected = true;
                      if ( // boolean filters are special since they don't rely on AJAX
                          response.item.description === 'COLA' ||
                          response.item.description === 'postDiff' ||
                          response.item.description === 'dangerPay' ||
                          response.item.description === 'domestic'
                        ) {
                        mappedObject.description = response.item.title;
                      } else {
                        // try to get the shortest description since pills should be small
                        mappedObject.description =
                            filterItemObject.short_description ||
                            filterItemObject.description ||
                            filterItemObject.long_description ||
                            filterItemObject.code;
                      }
                    }
                  });
                });
                // push our formed object to the mappedParams array
                if (ASYNC_PARAMS.indexOf(mappedObject.selectionRef) > -1) {
                  responses.asyncParams.push(mappedObject);
                } else {
                  responses.mappedParams.push(mappedObject);
                }
              });
            }
          });
        });
      }
      // set the hasFetched property so that our component knows when
      // to avoid an AJAX refresh
      responses.hasFetched = true;
      // add any arbitrary filters
      mapAsyncParams();
    }

    // If saved responses are returned, don't run AJAX.
    // This way, we can map any new query params without
    // needlessly refreshing the filters via AJAX.
    if (savedResponses) {
      // we still need to map any new arbitrary filters that were added
      dispatchSuccess();
    } else {
      // our static filters
      const staticFilters = items.filters.slice().filter(item => (!item.item.endpoint));
      responses.filters.push(...staticFilters);

      // our dynamic filters
      const dynamicFilters = items.filters.slice().filter(item => (item.item.endpoint));
      const queryProms = dynamicFilters.map(item => (
        axios.get(`${api}/${item.item.endpoint}`)
          .then((response) => {
            const itemFilter = Object.assign({}, item);
            itemFilter.data = response.data.results;
            return itemFilter;
          })
      ),
      );

      Promise.all(queryProms)
        // Promise.all returns a single array which matches the order of the originating array
        .then((results) => {
          results.forEach((result) => {
            responses.filters.push({ data: result.data, item: result.item });
          });
          dispatchSuccess();
        })
        .catch(() => {
          dispatch(filtersHasErrored(true));
          dispatch(filtersIsLoading(false));
        });
    }
  };
}

export const getMPTPortfolio = async (start, end) => {
  console.log('fetch getMPTPortfolio', start, end);
  const { data, errors } = await fetch(
    'https://x5bofqdafra6jknokswrxmvx24.appsync-api.us-east-1.amazonaws.com/graphql',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'da2-ju7cezqrzvdmtevjzotbwzy3qu',
      },
      body: JSON.stringify({
        query: `
      query MyQuery2(
        $asset_class_bounds: [AssetClassBoundInput] = []
        $in_sample_period: InSamplePeriodInput = {
          start: "2020-01-01"
          end: "2022-01-01"
        }
        $index_universe: [BoundedIndexConfigInput] = []
        $is_sample_constrained: Boolean = false
        $num_samples: Int = 10
      ) {
        getMPTPortfolio(
          asset_class_bounds: $asset_class_bounds
          in_sample_period: $in_sample_period
          index_universe: $index_universe
        ) {
          return_statistics {
            volatility {
              key
              value
            }
            return {
              key
              value
            }
            correlation_matrix {
              row
            }
          }
          samples(
            is_sample_constrained: $is_sample_constrained
            num_samples: $num_samples
          ) {
            returns
            stds
            sharpes
            efficient_frontier_line {
              mus
              stds
            }
          }
        }
      }`,
        variables: 
        {
          "index_universe": [
            {
              "code": "MSUSAML",
            },
            {
              "code": "MSEAFE$",
            },
            {
              "code": "MSEMKF$",
            },
            {
              "code": "SPBDUSL",
            },
            {
              "code": "SPBDU10",
            },
            {
              "code": "SPBDUS1",
            },
          ],
          "in_sample_period": { "start": start, "end": end },
          "num_samples": 1000,
        }
        ,
      }),
    }
  ).then((res) => {
    return res.json();
  });
  // .then((result) => console.log(result));
  if (!errors) {
    return data;
  } else {
    console.error(errors);
  }
};
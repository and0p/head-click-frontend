import React from 'react'
import { render } from 'react-dom'
import PropTypes from 'prop-types'

const amazonScript = () => {
  return Range.createCon('<script type="text/javascript">amzn_assoc_placement = "adunit0";amzn_assoc_search_bar = "false";amzn_assoc_tracking_id = "headclickdash-20";amzn_assoc_ad_mode = "search";amzn_assoc_ad_type = "smart";amzn_assoc_marketplace = "amazon";amzn_assoc_region = "US";amzn_assoc_title = "";amzn_assoc_default_search_phrase = "gaming mice";amzn_assoc_default_category = "Electronics";amzn_assoc_linkid = "0395d997dc02c8322c55dbb800f9128f";amzn_assoc_default_browse_node = "172282";amzn_assoc_rows = "1";</script><script src="//z-na.amazon-adsystem.com/widgets/onejs?MarketPlace=US"></script>')
}

export const AmazonNativeAd = props => {
      return amazonScript()
}
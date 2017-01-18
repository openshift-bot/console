import React from 'react';
import classnames from 'classnames';

import {toString} from '../../module/k8s/selector-requirement';
import {angulars} from '../react-wrapper';

const Requirement = ({requirement, withIcon}) => {
  const requirementAsString           = toString(requirement);
  const requirementAsUrlEncodedString = encodeURIComponent(requirementAsString);

  return (
    <div className="co-m-requirement">
      <a className="co-m-requirement__link" href={`search?kind=pod&q=${requirementAsUrlEncodedString}`}>
        { withIcon &&
          <span>
            <i className="fa fa-search"></i>&nbsp;
          </span>
        }
        <span>{requirementAsString}</span>
      </a>
    </div>
  );
};

export const Selector = ({expand, selector}) => {
  const requirements = angulars.k8s.selector.toRequirements(selector || {});

  const reqs = _.map(requirements, (requirement, i) => {
    const className = classnames({'co-m-requirement--last': i === requirements.length - 1});
    return <Requirement key={i} className={className} requirement={requirement} withIcon={i === 0} />;
  });

  const className = classnames('co-m-selector', {'co-m-selector--expand': expand});

  return <div className={className}>
    { reqs.length ? reqs : <p className="text-muted">No selector</p> }
  </div>;
};

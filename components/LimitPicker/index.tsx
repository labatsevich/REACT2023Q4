import { useRouter } from "next/router";
import { ChangeEvent } from "react";

export const LimitPicker = () => {

    const router = useRouter();
    const {query} = router;
    const _limit = query.limit || 25;

    const onLimitChange = (e: ChangeEvent<HTMLSelectElement>) => {
    
        delete query.q;
        delete query.id;
        router.push({query : {...query, limit: e.target.value, page: 1}});
        
    };
  
    return (
      <>
        <div className="picker">
          <label>
            On page:{' '}
            <select value={_limit} onChange={onLimitChange}>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={25}>25</option>
            </select>
          </label>
        </div>
      </>
    );
  };
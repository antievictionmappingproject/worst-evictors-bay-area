import Layout from "../components/layout";
import EvictorProfile from "../components/evictor";
import useListQuery from "../queries/list";

import "../styles/evictors-list.scss";

const CitywideEvictorsListPage = () => {
  const data = useListQuery();
  const evictorsContentList = data.allEvictor.nodes;

  return (
    <Layout
      customTitle="Top 20 List | NYC's Worst COVID Evictors"
      customDescription={data.contentfulCitywideListPage.title}
      customUrl="https://www.worstevictorsnyc.org/list"
      className="list-page"
    >
      <div className="list-page">
        <section className="bg-primary">
          <div className="columns text-secondary">
            <div className="column col-4 col-xl-6 col-lg-12">
              <h1>{data.contentfulCitywideListPage.title}</h1>
            </div>
            <div className="column col-8 col-xl-6 col-lg-12"></div>
          </div>
        </section>
        {evictorsContentList.map((content: any, i: number) => (
          <EvictorProfile content={content} key={i} />
        ))}
      </div>
    </Layout>
  );
};

export default CitywideEvictorsListPage;

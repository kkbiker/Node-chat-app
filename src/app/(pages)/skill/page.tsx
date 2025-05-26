'use client';

import { Header } from "@/component/skill/common/header/header";
import { Search } from "@/component/skill/common/search/search";
import { List } from "@/component/skill/contents/list/list";
import { ArticleGenre } from "@/component/skill/contents/articleGenre/articleGenre";
import { Post } from "@/component/skill/contents/post/post";
import { PostList } from "@/component/skill/contents/postList/postList";
import { Admin } from "@/component/skill/contents/admin/admin";
import { ArticleDetail } from "@/component/skill/contents/articleDetail/articleDetail";
// import { ArticleEdit } from "@/component/skill/contents/articleEdit/articleEdit";
import { Preview } from "@/component/skill/contents/preview/preview";
import { SkillProvider, useSkillContext } from "@/context/Skill/SkillContext";
import styles from "./skill.module.css";

function SkillContext() {
  const { isArticleList, isArticleGenre, isPost, isPostList, isAdmin, isArticleDetail, isArticleEdit, isPreview } = useSkillContext();

  return (
    <>
      <Header />
      <Search />
      {isArticleList && <List />}
      {isArticleGenre && <ArticleGenre />}
      {isPost && <Post />}
      {isPostList && <PostList />}
      {isAdmin && <Admin />}
      {isArticleDetail && <ArticleDetail />}
      {/* {isArticleEdit && <ArticleEdit />} */}
      {isPreview && <Preview />}
    </>
  );
}

export default function Skill() {
  return (
    <main className={styles.container}>
      <SkillProvider>
        <SkillContext />
      </SkillProvider>
    </main>
  );
}

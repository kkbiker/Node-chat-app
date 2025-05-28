'use client';

import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

type Genre = {
  id: number,
  name: string,
  removable: boolean,
  subgenres: Subgenre[]
}

type Subgenre = {
  id: number,
  name: string
}

type Article = {
  subgenre_id: number
  subgenre_name: string,
  id: number,
  title: string,
  description: string,
  aImgPath: string,
  is_edit: boolean,
  is_public: boolean,
  create_at: string,
  favorite_count: number
}

type SkillContext = {
  userId: number,
  companyId: string,
  genreId: number,
  postId: number,
  articleId: number,
  isAdmin: boolean,
  isPost: boolean,
  isPostList: boolean,
  isArticleList: boolean,
  isArticleDetail: boolean,
  isArticleEdit: boolean,
  isArticleGenre: boolean,
  isPreview: boolean,
  isEditing: boolean,
  genres: Genre[],
  genre: string,
  articles: Article[],
  isAllStatus: boolean,
  setIsAllStatus: (value: boolean) => void,
  isPublicStatus: boolean,
  setIsPublicStatus: (value: boolean) => void,
  isPrivateStatus: boolean,
  setIsPrivateStatus: (value: boolean) => void,
  isEditStatus: boolean,
  setIsEditStatus: (value: boolean) => void,
  setUserId: (value: number) => void,
  setGenreId: (value: number) => void,
  setPostId: (value: number) => void,
  setArticleId: (value: number) => void,
  setIsAdmin: (value: boolean) => void,
  setIsPost: (value: boolean) => void,
  setIsPostList: (value: boolean) => void,
  setIsArticleList: (value: boolean) => void,
  setIsArticleDetail: (value: boolean) => void,
  setIsArticleEdit: (value: boolean) => void,
  setIsArticleGenre: (value: boolean) => void,
  setIsPreview: (value: boolean) => void,
  setGenre: (value: string) => void,
  setArticles: (value: Article[]) => void,
  setIsEditing: (value: boolean) => void,
  handleReset: () => void,
  search: string,
  setSearch: (value: string) => void,
  handleHeader: (head: string) => void,
  ChangeView: (head: string) => void,
  showAlert: boolean,
  setShowAlert: (value: boolean) => void,
  showFavoriteList: boolean,
  setShowFavoriteList: (value: boolean) => void,
  whHead: string,
  setWhHead: (value: string) => void
}

const SkillContext = createContext<SkillContext | null>(null);

export const SkillProvider = ({ children }: { children: React.ReactNode }) => {
  const [userId, setUserId] = useState<number>(0)
  const [companyId, setCompanyId] = useState("");
  const [genreId, setGenreId] = useState<number>(0);
  const [postId, setPostId] = useState<number>(0);
  const [articleId, setArticleId] = useState<number>(0);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isPost, setIsPost] = useState(false);
  const [isPostList, setIsPostList] = useState(false);
  const [isArticleList, setIsArticleList] = useState(true);
  const [isArticleDetail, setIsArticleDetail] = useState(false);
  const [isArticleEdit, setIsArticleEdit] = useState(false);
  const [isArticleGenre, setIsArticleGenre] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [genres, setGenres] = useState<Genre[]>([]);
  const [genre, setGenre] = useState("");
  const [articles, setArticles] = useState<Article[]>([]);

  const [isAllStatus, setIsAllStatus] = useState(false);
  const [isPublicStatus, setIsPublicStatus] = useState(false);
  const [isPrivateStatus, setIsPrivateStatus] = useState(false);
  const [isEditStatus, setIsEditStatus] = useState(false);
  const [search, setSearch] = useState("");

  const handleReset = () => {
    setIsAdmin(false);
    setIsPost(false);
    setIsPostList(false);
    setIsArticleList(true);
    setIsArticleDetail(false);
    setIsArticleEdit(false);
    setIsArticleGenre(false);
    setIsPreview(false);
  };

  const [showAlert, setShowAlert] = useState(false);
  const [showFavoriteList, setShowFavoriteList] = useState(false);
  const [whHead, setWhHead] = useState("");

  const handleHeader = (head: string) => {
    if (isEditing) {
      setShowAlert(true);
      setWhHead(head);
      return;
    }

    ChangeView(head);
  }

  const ChangeView = (head: string)=> {
    handleReset();
    setIsEditing(false);
    setShowAlert(false);
    
    if (head === "head") { return }

    setIsArticleList(false);
    if (head === "favorite") {
      setShowFavoriteList(true);
    } else if (head === "admin") {
      setIsAdmin(true);
    } else if (head === "post") {
      setIsPost(true);
    } else if (head === "postList") {
      setIsPostList(true);
    }
  }

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) return;
    const user = JSON.parse(userData);
    setUserId(user.id);
    setIsAdmin(user.AdminFlag);
    setCompanyId(user.companyId);

    axios
      .get(`${process.env.NEXT_PUBLIC_NODE_API_URL}/genre/showAll`)
      .then((res) => {
        setGenres(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <SkillContext.Provider value={{
      userId,
      companyId,
      genreId,
      postId,
      articleId,
      isAdmin,
      isPost,
      isPostList,
      isArticleList,
      isArticleDetail,
      isArticleEdit,
      isArticleGenre,
      isPreview,
      genres,
      genre,
      articles,
      isEditing,
      isAllStatus,
      setIsAllStatus,
      isPublicStatus,
      setIsPublicStatus,
      isPrivateStatus,
      setIsPrivateStatus,
      isEditStatus,
      setIsEditStatus,
      setUserId,
      setGenreId,
      setPostId,
      setArticleId,
      setIsAdmin,
      setIsPost,
      setIsPostList,
      setIsArticleList,
      setIsArticleDetail,
      setIsArticleEdit,
      setIsArticleGenre,
      setIsPreview,
      setGenre,
      setArticles,
      handleReset,
      setIsEditing,
      search,
      setSearch,
      handleHeader,
      ChangeView,
      showAlert,
      setShowAlert,
      showFavoriteList,
      setShowFavoriteList,
      whHead,
      setWhHead
    }}>
      {children}
    </SkillContext.Provider>
  )
}

export const useSkillContext = () => {
  const context = useContext(SkillContext);
  if (!context) throw new Error("not found context");
  return context;
}

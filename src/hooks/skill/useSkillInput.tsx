import { useSkillContext } from "@/context/Skill/SkillContext";
import { useCallback, useRef, useState } from "react";

export const useSkillInput = () => {
  const { setIsEditing } = useSkillContext();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const subFileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [postGenre, setPostGenre] = useState("");
  const [isPostGenreEmpty, setIsPostGenreEmpty] = useState(false);
  const [title, setTitle] = useState("");
  const [isTitleEmpty, setIsTitleEmpty] = useState(false);
  const [isTitleSize, setIsTitleSize] = useState(false);
  const [description, setDescription] = useState("");
  const [isDescriptionEmpty, setIsDescriptionEmpty] = useState(false);
  const [isDescriptionSize, setIsDescriptionSize] = useState(false);
  const [titleImg, setTitleImg] = useState<File | null>(null);
  const [fileSizeOver, setFileSizeOver] = useState(false);

  const handleTitle = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      setIsEditing(true);
      const value = e.target.value;
      setIsTitleEmpty(false);
      setIsTitleSize(value.length > 50);
      setTitle(value);
    }, []);
  
    const handleDescription = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setIsEditing(true);
      const value = e.target.value;
      setIsDescriptionEmpty(false);
      setIsDescriptionSize(value.length > 1000);
      setDescription(value);
    }, []);
  
    const handleFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      setIsEditing(true);
      const value = e.target.files?.[0];
      if (!value) return;
      setFileSizeOver(value.size > 5 * 1024 * 1024);
      setTitleImg(value);
    }, []);
  
    const handleFileDelete = useCallback(() => {
      setIsEditing(true);
      setTitleImg(null);
      setFileSizeOver(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }, []);
  
    type SubpostType = {
      subTitle: string,
      content: string,
      imgPath: string,
      file: File | null
    }
    type SubpostError = {
      isSubTitleEmpty: boolean,
      isSubTitleSize: boolean,
      isContentEmpty: boolean,
      isContentSize: boolean
    }
    const [subposts, setSubposts] = useState<SubpostType[]>([]);
    const [subpostserrors, setSubposterrors] = useState<SubpostError[]>([]);
  
    const handleSubTitle = useCallback((index: number, value: string) => {
      setIsEditing(true);
      setSubposts((prev) => {
        const update = [...prev];
        if (update[index]) update[index].subTitle = value;
        return update;
      });
    }, [setIsEditing]);
  
    const handleContent = useCallback((index: number, value: string) => {
      setIsEditing(true);
      setSubposts((prev) => {
        const update = [...prev];
        if (update[index]) update[index].content = value;
        return update;
      });
    }, [setIsEditing]);
  
    const handleSubImg = useCallback((index: number, value: File | null) => {
      setIsEditing(true);
      setSubposts((prev) => {
        const update = [...prev];
        if (update[index]) update[index].file = value;
        return update;
      })
    }, [setIsEditing]);
  
    const handleDeleteSubImg = useCallback((index: number) => {
      setIsEditing(true);
      setSubposts(prev => {
        const updated = [...prev];
        if (updated[index]) {
          updated[index].file = null;
        }
        return updated;
      });
  
      const inputRef = subFileInputRefs.current[index];
      if (inputRef) {
        inputRef.value = "";
      }
    }, [setIsEditing]);
  
    const handleAdd = () => {
      setIsEditing(true);
      setSubposts((prev) => [...prev, { subTitle: "", content: "", imgPath: "", file: null }]);
      setSubposterrors((prev) => [...prev, { isSubTitleEmpty: false, isSubTitleSize: false, isContentEmpty: false, isContentSize: false }])
    }
  
    const handlereduse = (index: number) => {
      setIsEditing(true);
      setSubposts((prev) => prev.filter((_, i) => i !== index));
    }

  return {
    fileInputRef,
    subFileInputRefs,
    postGenre,
    setPostGenre,
    isPostGenreEmpty,
    setIsPostGenreEmpty,
    title,
    setTitle,
    isTitleEmpty,
    setIsTitleEmpty,
    isTitleSize,
    setIsTitleSize,
    description,
    setDescription,
    isDescriptionEmpty,
    setIsDescriptionEmpty,
    isDescriptionSize,
    setIsDescriptionSize,
    titleImg,
    setTitleImg,
    fileSizeOver,
    setFileSizeOver,
    handleTitle,
    handleDescription,
    handleFile,
    handleFileDelete,
    subposts,
    setSubposts,
    subpostserrors,
    setSubposterrors,
    handleSubTitle,
    handleContent,
    handleSubImg,
    handleDeleteSubImg,
    handleAdd,
    handlereduse
  }
}

import { getRandomImage } from "./get-random-image";
import prisma from "./prisma";

export async function generateBoardAndLists(projectId: string, projectName:string) {
  const lists = ['TODO', 'IN PROGRESS', 'DONE'];
  const randomImageData = await getRandomImage();

  // Create a board for the project
  const board = await prisma.board.create({
    data: {
      title: projectName,
      projectId,
      imageId: randomImageData.imageId,
      imageThumbUrl: randomImageData.imageThumbUrl,
      imageFullUrl: randomImageData.imageFullUrl,
      imageUserName: randomImageData.imageUserName,
      imageLinkHTML: randomImageData.imageLinkHTML,
    },
  });

  // Create lists for the board
  for (const listTitle of lists) {
    await prisma.list.create({
      data: {
        title: listTitle,
        order: lists.indexOf(listTitle),
        boardId: board.id,
      },
    });
  }
}

/**
 * Calculate edit and delete permissions for posts and resources
 * @param authorId - The ID of the user who created the post/resource (as string)
 * @param currentUserId - The ID of the current logged-in user (as string)
 * @param isAdmin - Whether the current user is an admin of the topic
 * @returns Object with canEdit and canDelete boolean values
 */
export function calculatePermissions(
  authorId: string | number | undefined,
  currentUserId: string | null | undefined,
  isAdmin: boolean | undefined
): { canEdit: boolean; canDelete: boolean } {
  if (!authorId || !currentUserId) {
    return { canEdit: false, canDelete: false };
  }

  const isAuthor = authorId.toString() === currentUserId.toString();
  const adminFlag = isAdmin ?? false;

  return {
    canEdit: isAuthor, // Only author can edit
    canDelete: isAuthor || adminFlag, // Author or admin can delete
  };
}

